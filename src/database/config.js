import { createRealmContext } from '@realm/react';

import Expense from './model/expense.model';

const realmConfig = {
    schema: [Expense],
    deleteRealmIfMigrationNeeded: true,
};

const { RealmProvider, useObject, useQuery, useRealm } = createRealmContext(realmConfig);

export default {
    RealmProvider,
    useObject,
    useQuery,
    useRealm,
};