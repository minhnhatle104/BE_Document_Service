import fs  from 'fs'
import admin from 'firebase-admin'
const serviceAccount = admin.initializeApp({
    credential: admin.credential.cert({
            "type": "service_account",
            "project_id": "signatext",
            "private_key_id": "ff8ccc065005dd75cfe1cc5f9d642a2e3e3b62ae",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCqGD2lRyjQLAzF\nU/sdLEz9vGxLvWl4Yj99sh6344OX+N8fwcWJgtyrXXAYJ0wpqug2XUTe5x0HkEtr\nRNLeMI8X+bVJFqfK4ZfvOyhd0V41QPc827UICimKt9M6fl773BvyLvSmFkl8uOBG\nomBkqGlOncLtWMQyC1um27pNXQtrMp2OHfliQwSB7AbguJmF4i2RJfyDMS9/erbW\nXF2FShacGjpMNgWuyWaxgHDizQodct3S4iBCcuBc9XCd87qMhggfDE0kLjneR2Gz\nOubHtB3oQ4zidBhHkOcKAWq8YyhHhsTLHIQuWVML4hypz7FPTf4AXMgsERoSG990\nDgY582CXAgMBAAECggEAKS1kIxJmgXrgfpbVmFrkqpqGVxGcKl4Sg8HuqNLFxTEl\nBuGYijEpbbzZiaddy0qKG7sZlKK7hty6PVY0fECiK4oyhmabKUTSzMH0BD5OwbKg\nB9YibbdUFjZpRuRX5z4Cb+9JH7oOgUiaVs8xabzRfYw4p8/Q81KHlg3kfJ0VShZa\nHtf2a7/IUzYY5BOWjzw0dzbiDj2JRgTVNvrGO4Zw6fcG5wPYkMXQmhCVHiwjAzW8\nFmok0DgiCO4CJ9yPBcLo1hXIaY7QIuX7BNXIjBcK3hgk0xFdw7eJXIOzF9jnichs\ni3FVZ5TsDV+b1A1hHOJYux3ueKfsGr8zEj0uL3AVAQKBgQDbjb7a2u1+ZbDnkkp2\nKWCy3dzgojwVCrLkhTnLnuWDO43Bg40P5LqACFdB95PQbMdJV0AOdCe5UwMMgNG1\nrAxMGB2uARfzZMbQiJV7qO3gDuipboC8QL2NeO7lJ/xnaOw+l2rwl0kjBzNGZPXG\nwBpfu59D7ovHdb7a0Lq8fikNlwKBgQDGVKmtgt6J2ITcStDxSYi4kNBxNcfwgKu5\nwvKtCQiF2VMvMlH6yheoGMa0W0Ha3QoMpIReREtbsD1z43PcYyrQQNEZ/QLmvQtL\naDkT3FeuTd7MdMtvPiyN80G5kWZy29hTlinSYA9EA36QX/SsrtozYvnSdNfy+N0z\n3CSXuzilAQKBgQDNaOFOGxOldPi8v1ahFHdfAUm8dKyntxnFyYtYITJzxE0M5soc\nO4/tZ2BT3JDTqGIPEO1iWHQt5CdvFDqfsPbUXp+uA2HoGroTsiXAyzy6qtgsZLFW\n728opCNGDFIOYdDdgobPz4rilcL4Mk7sAyDpvjz0roLiOxwz1qNO5O39wwKBgHKn\nuRvs3zfzawNrYRVMfHSui0IXZEneKOiQEfkEkt/GPne3cHs6X6i3AhB7/TtIs6mR\nZlCUzLfpz+zyHiXXUoXoIroScZ3wxdnHG9Amfq3uqJGsJ3tdBybc7S8ZJo/aFlpk\nIjNTgx+/oWhXgLxfrRct7dzD3Z/CTSbQ6nqpKlsBAoGAa42Fmo9q7NFJOBXSDfZo\nnlz6MOg0zaV5T0PNI25LTNHxkpWtzJPLoi5cpuog4BvoyCVvVItxB+kKdBSDy8N7\nKeVit+eynTZG9LBGdQv/2SyDhJAI6SJg7ZTmrGm0BhAjCVUObZLT8+Opqg6QlXe1\n7JckoFQudg80UQhQd/ywlKk=\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-xg2a7@signatext.iam.gserviceaccount.com",
            "client_id": "112166862529747134224",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xg2a7%40signatext.iam.gserviceaccount.com"
        }
    ),
    storageBucket: 'gs://signatext.appspot.com/'
});
export default serviceAccount