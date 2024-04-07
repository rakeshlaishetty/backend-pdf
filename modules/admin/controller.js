const Project = require("../../mongodb/Schemas/ProjectSchema");
const User = require("../../mongodb/Schemas/UserSchema");
const Document = require("../../mongodb/Schemas/DocumentSchema");
const { successResponse, errorResponse } = require("../../utils/response");

class ProjectAPI {
  async createProject(req, res, next) {
    try {
      const {
        projectName,
        projectStartDate,
        projectEndDate,
        clientId,
        documents = [],
      } = req.body;

      const project = new Project({
        projectName,
        projectStartDate,
        projectEndDate,
        clientId,
        documents,
      });

      await project.save();
      successResponse(res, 201, project, "Project created successfully");
    } catch (error) {
      next(error);
    }
  }

  async getAllProjects(req, res, next) {
    try {
      const page = parseInt(req.body.page) || 1;
      const limit = parseInt(req.body.limit) || 10;

      const startIndex = (page - 1) * limit;

      const projects = await Project.find().populate('clientId').skip(startIndex).limit(limit);

      const totalProjects = await Project.countDocuments();
      const totalPages = Math.ceil(totalProjects / limit);

      const pagination = {
        currentPage: page,
        totalPages: totalPages,
        pageSize: limit,
        totalProjects: totalProjects,
      };

      successResponse(
        res,
        200,
        { projects, pagination },
        "Projects fetched successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  async getProject(req, res, next) {
    try {
      const projectId = req.body.projectId;
      const project = await Project.findById(projectId);

      if (!project) {
        return errorResponse(res, 404, "Project not found");
      }

      successResponse(res, 200, project, "Project fetched successfully");
    } catch (error) {
      next(error);
    }
  }
  async getAllPeopleFromProject(req, res, next) {
    try {
      const projectId = req.body.projectId; // Assuming projectId is passed as a URL parameter

      // Find all documents for the given project
      const documents = await Document.find({ Project: projectId }).populate(
        "Assigned"
      );

      if (!documents) {
        return errorResponse(res, 404, "Documents not found for the project");
      }

      // Extract all unique users assigned to the project
      const people = documents.reduce((peopleList, document) => {
        if (document.Assigned && !peopleList.includes(document.Assigned)) {
          peopleList.push(document.Assigned);
        }
        return peopleList;
      }, []);

      successResponse(
        res,
        200,
        people,
        "People fetched successfully for the project"
      );
    } catch (error) {
      next(error);
    }
  }
  async getAllDocumentsFromProject(req, res, next) {
    try {
      const projectId = req.body.projectId;
      const page = parseInt(req.body.page) || 1;
      const limit = parseInt(req.body.limit) || 10;

      const startIndex = (page - 1) * limit;

      const documents = await Document.find({ Project: projectId }).populate(
        "Assigned"
      ).skip(startIndex).limit(limit);

      if (!documents) {
        return errorResponse(res, 404, "Documents not found for the project");
      }

      const totalDocuments = await Document.countDocuments();
      const totalPages = Math.ceil(totalDocuments / limit);

      const pagination = {
        currentPage: page,
        totalPages: totalPages,
        pageSize: limit,
        totalDocuments: totalDocuments,
      };


      successResponse(
        res,
        200,
        { documents, pagination },
        "Documents fetched successfully for the project"
      );
    } catch (error) {
      next(error);
    }
  }
  async getAllDocuments(req, res, next) {
    try {
      const page = parseInt(req.body.page) || 1;
      const limit = parseInt(req.body.limit) || 10;

      const startIndex = (page - 1) * limit;

      const documents = await Document.find().populate(
        "Assigned"
      ).skip(startIndex).limit(limit);

      if (!documents) {
        return errorResponse(res, 404, "Documents not found for the project");
      }

      const totalDocuments = await Document.countDocuments();
      const totalPages = Math.ceil(totalDocuments / limit);

      const pagination = {
        currentPage: page,
        totalPages: totalPages,
        pageSize: limit,
        totalDocuments: totalDocuments,
      };


      successResponse(
        res,
        200,
        { documents, pagination },
        "Documents fetched successfully for the project"
      );
    } catch (error) {
      next(error);
    }
  }
  async getoneDocument(req, res, next) {
    try {
      const projectId = req.body.projectId;
      const documentId = req.body.documentId;

      const document = await Document.findOne({
        Project: projectId,
        _id: documentId,
      }).populate("Assigned");

      if (!document) {
        return errorResponse(res, 404, "Document not found for the project");
      }

      successResponse(
        res,
        200,
        document,
        "Document fetched successfully for the project"
      );
    } catch (error) {
      next(error);
    }
  }
  async createDocument(req, res, next) {
    try {

      const { documentUrl = null, documentName, projectId, assignedId = null } = req.body

      const document = new Document({ documentUrl, documentName: documentName, Project: projectId, Assigned: assignedId })
      await document.save()
      successResponse(
        res,
        200,
        document,
        "Document fetched successfully for the project"
      );
    } catch (error) {
      next(error);
    }
  }
  async getuserDetails(req, res, next) {
    try {
      const UserID = req.body.userId;

      const userData = await Document.findOne({
        _id: UserID,
      }).populate("Projetc");

      if (!userData) {
        return errorResponse(res, 404, "user not found for the project");
      }

      successResponse(
        res,
        200,
        document,
        "user fetched successfully for the project"
      );
    } catch (error) {
      next(error);
    }
  }
  async getClients(req, res, next) {
    try {
      const userData = await User.find().populate("role");
      if (!userData) {
        return errorResponse(res, 404, "user not found for the project");
      }
      console.log(userData, "user")

      const ClientIds = userData.filter(
        (client) => client.role.roleName == "client"
      );

      console.log(ClientIds)
      successResponse(
        res,
        200,
        ClientIds,
        "user fetched successfully for the project"
      );
    } catch (error) {
      next(error);
    }
  }
  async getAllEmployees(req, res, next) {
    try {
      const userData = await User.find().populate("role");
      if (!userData) {
        return errorResponse(res, 404, "user not found for the project");
      }
      console.log(userData, "user")

      const ClientIds = userData.filter(
        (client) => client.role.roleName == "employee"
      );

      console.log(ClientIds)
      successResponse(
        res,
        200,
        ClientIds,
        "user fetched successfully for the project"
      );
    } catch (error) {
      next(error);
    }
  }
  async getAllUsersFilter(req, res, next) {
    let { userRole, page = 1, limit = 10 } = req.query; // Default page is 1 and limit is 10, unless specified in the request query
    try {

      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;

      const startIndex = (page - 1) * limit;
      const userData = await User.find().populate("role").select("-password")
        .skip(startIndex)
        .limit(limit); // Limit the number of documents returned per page
  
      if (!userData || userData.length === 0) {
        return errorResponse(res, 404, "No users found for the provided criteria.");
      }
  
  
      const userIds = userData.filter(
        (client) => client.role.roleName == userRole
      );


      const totalDocuments = await User.countDocuments();
      const totalPages = Math.ceil(totalDocuments / limit);

      const pagination = {
        currentPage: page,
        totalPages: totalPages,
        pageSize: limit,
        totalDocuments: totalDocuments,
      };
  
      successResponse(
        res,
        200,
        {pagination,userIds},
        "Users fetched successfully for the provided criteria."
      );
    } catch (error) {
      next(error);
    }
  }
  async getUserData(req, res, next) {
    let { userId } = req.query; // Default page is 1 and limit is 10, unless specified in the request query
    try {

      const userData = await User.findById(userId).populate("role").select("-password") 
      
      if (!userData) {
        return errorResponse(res, 404, "No users found for the provided criteria.");
      }
  
      successResponse(
        res,
        200,
        userData,
        "Users fetched successfully for the provided criteria."
      );
    } catch (error) {
      next(error);
    }
  }
  
}

const ProjectApiController = new ProjectAPI();
module.exports = ProjectApiController;
