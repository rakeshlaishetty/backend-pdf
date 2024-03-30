const Project = require("../../mongodb/Schemas/ProjectSchema");
const User = require("../../mongodb/Schemas/UserSchema");
const Document = require("../../mongodb/Schemas/DocumentSchema");
const { successResponse, errorResponse } = require("../../utils/response");
const Status = require("../../utils/DocumentStatus");

class EmployeeAPI {
  async getProjects(req, res, next) {
    try {
      const clientId = req.user._id;

      // Find all projects of the client
      const projects = await Project.find({ clientId }).populate("documents");

      if (!projects || projects.length === 0) {
        return errorResponse(res, 404, "No projects found for the client");
      }

      successResponse(
        res,
        200,
        projects,
        "projects details fetched successfully"
      );
    } catch (error) {
      next(error);
    }
  }
  async getAllDocuments(req, res, next) {
    try {
      const userId = req.user._id;

      const documents = await Document.find({
        Assigned: userId,
      });

      if (!documents || documents.length === 0) {
        return errorResponse(res, 404, "No projects found for the client");
      }

      successResponse(
        res,
        200,
        documents,
        "documents details fetched successfully"
      );
    } catch (error) {
      next(error);
    }
  }
  async getDocumentWithUser(req, res, next) {
    try {
      const documentId = req.body.documentId;
      const userId = req.user._id;

      const document = await Document.findOne({
        _id: documentId,
        Assigned: userId,
      })
        .populate("Project")
        .populate("Assigned");

      if (!document) {
        return errorResponse(res, 404, "Document not found");
      }
      const result = {
        document: document,
      };

      successResponse(
        res,
        200,
        result,
        "User details fetched successfully with associated Document"
      );
    } catch (error) {
      next(error);
    }
  }
  async UpdateDocumentStatus(req, res, next) {
    try {
      const documentId = req.body.documentId;
      const status = req.body.status;
      const userId = req.user._id;
      if (status == Status.Processed) {
        return errorResponse(res, 403, "you cannot update Status as processed");
      }
      const updatedDocument = await Document.findByIdAndUpdate(
        { _id: documentId, Assigned: userId },
        { $set: { status: status } },
        { new: true }
      );

      if (!updatedDocument) {
        return errorResponse(res, 404, "Document not found");
      }

      successResponse(
        res,
        200,
        updatedDocument,
        "Document status updated to Successfully"
      );
    } catch (error) {
      next(error);
    }
  }
}

const EmployeeAPIController = new EmployeeAPI();
module.exports = EmployeeAPIController;
