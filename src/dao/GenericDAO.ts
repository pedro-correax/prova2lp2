import sqlite3 from 'sqlite3';
import { Database } from 'sqlite3';

export type Operator = '=' | '!=' | '>' | '<' | '>=' | '<=';

export interface Criteria {
  field: string;
  op: Operator;
  value: string | number;
}

export class GenericDAO<T extends { id?: number }> {
  private db: Database;
  private tableName: string;

  constructor(tableName: string, dbPath: string = ':memory:') {
    this.tableName = tableName;
    this.db = new sqlite3.Database(dbPath);
  }

  private runQuery(sql: string, params: any[] = []): Promise<{ lastID: number }> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (this: sqlite3.RunResult, err) {
        if (err) reject(err);
        else resolve({ lastID: this.lastID });
      });
    });
  }

  private getQuery(sql: string, params: any[] = []): Promise<T | null> {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row ? (row as T) : null);
      });
    });
  }

  private allQuery(sql: string, params: any[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows as T[]);
      });
    });
  }

  async create(entity: T): Promise<{ id: number }> {
    const fields = Object.keys(entity).filter(key => key !== 'id');
    const values = fields.map(field => (entity as any)[field]);
    const placeholders = fields.map(() => '?').join(',');
    
    const sql = `INSERT INTO ${this.tableName} (${fields.join(',')}) VALUES (${placeholders})`;
    const result = await this.runQuery(sql, values);
    return { id: result.lastID };
  }

  async read(id: number): Promise<T | null> {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    return await this.getQuery(sql, [id]);
  }

  async update(id: number, entity: T): Promise<void> {
    const fields = Object.keys(entity).filter(key => key !== 'id');
    const values = fields.map(field => (entity as any)[field]);
    const setClause = fields.map(field => `${field} = ?`).join(',');
    
    const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`;
    await this.runQuery(sql, [...values, id]);
  }

  async delete(id: number): Promise<void> {
    const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
    await this.runQuery(sql, [id]);
  }

  async findAll(): Promise<T[]> {
    const sql = `SELECT * FROM ${this.tableName}`;
    return await this.allQuery(sql);
  }

  async findByCriteria(criteria: Criteria): Promise<T[]> {
    const sql = `SELECT * FROM ${this.tableName} WHERE ${criteria.field} ${criteria.op} ?`;
    return await this.allQuery(sql, [criteria.value]);
  }

  async close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}