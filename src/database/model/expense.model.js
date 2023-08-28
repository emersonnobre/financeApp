import Realm from 'realm';

export default class Expense extends Realm.Object {
    static schema = {
        name: 'Expense',
        properties: {
            _id: 'objectId',
            description: 'string',
            date: 'date',
            amount: 'double',
            expensePicture: 'string?',
            latitude: 'double?',
            longitude: 'double?',
        },
        primaryKey: '_id',
    };
}