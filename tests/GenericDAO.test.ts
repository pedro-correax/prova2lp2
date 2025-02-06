import { GenericDAO } from '../src/dao/GenericDAO';
import { User, Product, Order } from '../src/models';
import { faker } from '@faker-js/faker';

describe('GenericDAO Tests', () => {
  let userDao: GenericDAO<User>;
  let productDao: GenericDAO<Product>;
  let orderDao: GenericDAO<Order>;

  beforeEach(() => {
    userDao = new GenericDAO<User>('users', 'test.db');
    productDao = new GenericDAO<Product>('products', 'test.db');
    orderDao = new GenericDAO<Order>('orders', 'test.db');
  });

  afterEach(async () => {
    await userDao.close();
    await productDao.close();
    await orderDao.close();
  });

  describe('User DAO Tests', () => {
    it('should insert a user successfully', async () => {
      const user: User = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 80 }),
        city: faker.location.city()
      };
      
      const insertedId = (await userDao.create(user))?.id;
      const insertedUser = await userDao.read(insertedId);      
      expect(insertedUser).not.toBeNull();
      expect(insertedUser?.name).toBe(user.name);
    });

    it('should read an existing user and return null for a non-existing user', async () => {
      const users = await userDao.findAll();
      if (users.length > 0) {
        const user = await userDao.read(users[0].id!);
        expect(user).not.toBeNull();
      }
      const nonExistingUser = await userDao.read(-1);
      expect(nonExistingUser).toBeNull();
    });

    it('should update a user', async () => {
      const users = await userDao.findAll();
      const user = users[0];
      const updatedName = faker.person.fullName();

      await userDao.update(user.id!, { ...user, name: updatedName });
      const updatedUser = await userDao.read(user.id!);

      expect(updatedUser?.name).toBe(updatedName);
    });

    it('should delete a user', async () => {
      const users = await userDao.findAll();
      const user = users[0];

      await userDao.delete(user.id!);
      const deletedUser = await userDao.read(user.id!);

      expect(deletedUser).toBeNull();
    });

    it('should list all users', async () => {
      const users = await userDao.findAll();
      expect(Array.isArray(users)).toBe(true);
    });

    it('should find users by criteria', async () => {
      const users = await userDao.findByCriteria({
        field: 'age',
        op: '>',
        value: 30
      });

      expect(users.every(user => user.age > 30)).toBe(true);
    });
  });


});
