const { faker } = require('@faker-js/faker');

function generateVmName() {
  const env = faker.helpers.arrayElement(['dev', 'test', 'staging', 'prod']);
  const role = faker.helpers.arrayElement(['web', 'db', 'cache', 'api']);
  const region = faker.helpers.arrayElement(['id', 'sg']);
  const suffix = faker.number.int({ min: 1, max: 99 }).toString().padStart(2, '0');
  return `vm-${env}-${role}-${region}-${suffix}`;
}

function getMockVMList() {
  return Array.from({ length: 5 }).map(() => ({
    id: faker.string.uuid(),
    name: generateVmName(),
    status: faker.helpers.arrayElement(['Running', 'Stopped', 'Crashed']),
    ip: faker.internet.ipv4(),
    region: faker.helpers.arrayElement(['indonesia', 'singapore']),
    createdAt: faker.date.recent(),
  }));
}

function getMockStorageList() {
  return Array.from({ length: 4 }).map(() => ({
    id: faker.string.uuid(),
    name: `${faker.word.noun()}-storage`,
    sizeGB: faker.number.int({ min: 10, max: 500 }),
    type: faker.helpers.arrayElement(['SSD', 'HDD']),
  }));
}

function getMockNetworkList() {
  return Array.from({ length: 3 }).map(() => ({
    id: faker.string.uuid(),
    name: `${faker.word.adjective()}-network`,
    bandwidth: faker.number.int({ min: 100, max: 1000 }),
    status: faker.helpers.arrayElement(['Active', 'Inactive']),
  }));
}

module.exports = {
  getMockVMList,
  getMockStorageList,
  getMockNetworkList,
};
