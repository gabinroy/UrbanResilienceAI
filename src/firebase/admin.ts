'use server'

import * as admin from 'firebase-admin';

let app: admin.app.App;

export function getAdminApp() {
    if (app) {
        return app;
    }

    if (admin.apps.length > 0) {
        app = admin.apps[0]!;
        return app;
    }
    
    // This environment variable is set by Firebase App Hosting.
    if (process.env.FIREBASE_CONFIG) {
        app = admin.initializeApp();
        return app;
    }

    // For local development, you need a service account key.
    // 1. Go to your Firebase project settings -> Service accounts.
    // 2. Click "Generate new private key".
    // 3. Save the JSON file to your project root.
    // 4. Set the GOOGLE_APPLICATION_CREDENTIALS environment variable
    //    to the path of your service account key file.
    //    e.g., export GOOGLE_APPLICATION_CREDENTIALS="path/to/your/key.json"
    
    try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);
         app = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    } catch (e) {
        console.warn(
          'Could not initialize Firebase Admin SDK. ' +
            'Did you remember to set the FIREBASE_SERVICE_ACCOUNT_KEY environment variable? ' +
            'You can get it from the Firebase console.'
        );
        // initialize without credentials for client-side usage of stubs.
        app = admin.initializeApp();
    }


    return app;
}
