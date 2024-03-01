const RequestHandler = require('./RequestHandler');
const Authorization = require('./auth/Authorization');
const MailVerify = require('./mail/MailVerify');

/**
 * Represents a REST API handler for managing Person-related operations.
 * @extends RequestHandler
 */
class PersonAPI extends RequestHandler {
    /**
     * Creates an instance of PersonAPI.
     */
    constructor() {
        super();
    }

    /**
     * Returns the API path for Person-related operations.
     * @returns {string} The API path.
     */
    static get PERSON_API_PATH() {
        return '/person'
    }

    /**
     * Gets the path for the current PersonAPI instance.
     * @returns {string} The API path for the current instance.
     */
    get path() {
        return PersonAPI.PERSON_API_PATH;
    }

    /**
     * Handles the registration of API routes for Person-related operations like logín and registering a person.
     */
    async registerHandler() {
        try {
            await this.retrieveController();

            // Add a middleware to check if the user is signed in before handling the /apply route


            this.router.post(
                '/login',
                async (req, res, next) => {
                    const { username, password } = req.body;
                    try {
                        const person = await this.contr.login(username, password);
                        if (person) {
                            const roleOf = (person.role_id === 1) ? "recruiter" : "applicant";

                            // Assuming person has properties like name, id, application_status_id, and role_id
                            const responseData = {
                                name: person.name,
                                id: person.person_id,
                                application_status_id: person.application_status_id,
                                role_id: person.role_id,
                                personMail: person.email,
                                role: roleOf
                            };

                            Authorization.setAuthCookie(person, res);
                            this.sendHttpResponse(res, 200, responseData);
                        } else {
                            this.sendHttpResponse(res, 401, "Login failed");
                        }
                    } catch (err) {
                        next(err);
                    }
                }
            );
/*
            // New registration route for when a user signs up to our application
            this.router.post(
                '/register',
                async (req, res, next) => {
                    const { formData } = req.body;
                    try {
                        const response = await this.contr.register(formData);
                        // Handle successful registration
                        res.send(response.data);
                    } catch (error) {
                        res.status(500).json({ message: "Error creating/updating user Please try again later", error: error.message });
                    }

                }
            );
*/
            //sending verification code to existing users.
            this.router.post(
                '/sendVerification',
                async (req, res, next) => {
                    const { formData } = req.body;
                    try {
                        const verificationCode = MailVerify.sendVerificationCode(formData.email); //email address is in formData.personMail
                        // Handle successful verification code sending
                        res.status(200).json({ message: "Verification code sent successfully" });
                    } catch (error) {
                        console.error('Error sending verification code:', error);
                        res.status(500).json({ message: "Error sending verification code. Please try again later", error: error.message });
                    }
                }
            );

            this.router.post(
                '/verifyVerificationCode',
                async (req, res, next) => {
                    const { formData, verificationCode } = req.body;
                    try {
                        const ourVerificationCode = MailVerify.getVarificationCode();
                        if (verificationCode === ourVerificationCode ) {
                            const response = await this.contr.register(formData);
                            res.status(200).json({ message: "Verification code matched", response });
                        } else {
                            console.log('Verification code does not match');
                            res.status(400).json({ message: "Verification code mismatch" });
                        }
                    }catch (error) {
                        console.error('Error verifying verification code:', error);

                        // Extract specific error information
                        const errorMsg = {
                            message: error.message,
                            error: error,
                            projectDAOError: error.jse_info && error.jse_info.ProjectDAO ? error.jse_info.ProjectDAO : null,
                            customError: (error.jse_cause ? error.jse_cause.toString() : ''), // Include the specific error information
                        };

                        res.status(500).json(errorMsg);
                    }
                }
            );

        }
        catch (err) {
            console.log(err);
        }
    }
}

// Export the PersonAPI class to make it available for other modules
module.exports = PersonAPI;