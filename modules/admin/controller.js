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

      const projects = await Project.find().skip(startIndex).limit(limit);

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
  async getAllDocuments(req, res, next) {
    try {
      const projectId = req.body.projectId; // Assuming projectId is passed as a URL parameter

      // Find all documents for the given project
      const documents = await Document.find({ Project: projectId }).populate(
        "Assigned"
      );

      if (!documents) {
        return errorResponse(res, 404, "Documents not found for the project");
      }

      successResponse(
        res,
        200,
        documents,
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
}

const ProjectApiController = new ProjectAPI();
module.exports = ProjectApiController;
