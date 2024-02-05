const ProjectDAO = require('../integration/ProjectDAO');

class UserController {
    constructor() {
        this.ProjectDAO = new ProjectDAO();
    }

    async login(username, password) {
        return this.ProjectDAO.findUserByUsernameAndPassword(username, password);
    }
}

module.exports = UserController;