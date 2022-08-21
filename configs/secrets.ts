import AWS from "aws-sdk";
/**
 * Load secrets
 * @param {String} secretId 
 * @param {String} region 
 * @returns {Promise<object|null>}
 */
const load = (secretId: string, region: string): Promise<object | null> => {
    // configure AWS SDK
    const client = new AWS.SecretsManager({ region });
    return new Promise((resolve, reject) => {
        // retrieving secrets from secrets manager
        client.getSecretValue({ SecretId: secretId }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data.SecretString));
            }
        });
    });
};

export default {
    load
}