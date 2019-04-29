'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const expect = chai.expect;
//const should = chai.should();

const {BlogPost} = require('../models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

//populates db with generated data
function seedBlogpostData() {
    console.info('seeding blogpost data');
    const seedData = [];

    for(let i=1; i<=10; i++) {
        seedData.push(generateBlogpostData());
    }

    return BlogPost.insertMany(seedData);
}

//returns generated blogpost data using faker.js library
function generateBlogpostData() {
    return {
        author: {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName()
        },
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph()
    }
}

//deletes database
function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}

describe('Blogpost API resource', function() {
    
    before(function () {
        return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function() {
        return seedBlogpostData();
    });

    afterEach(function() {
        return tearDownDb();
    });

    after(function() {
        return closeServer();
    });

    describe('GET endpoint', function() {
        it('should return all existing posts', function() {
            let res;
            return chai.request(app)
                .get('/posts')
                .then(function(_res) {
                    res = _res;
                    expect(res).to.have.status(200);
                    console.log(res.body.posts)
                    expect(res.body).to.have.lengthOf.at.least(1);
                    return BlogPost.count();
                })
                .then(function(count) {
                    expect(res.body).to.have.lengthOf(count);
                });
        });
    });
});
