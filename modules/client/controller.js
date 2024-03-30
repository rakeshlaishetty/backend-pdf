const Project = require("../../mongodb/Schemas/ProjectSchema");
const User = require("../../mongodb/Schemas/UserSchema");
const Document = require("../../mongodb/Schemas/DocumentSchema");
const { successResponse, errorResponse } = require("../../utils/response");

class ClientAPI {
 
    async getProjectsAndUsers(req, res, next) {
        try {
          const clientId = req.user._id;
    
          // Find all projects of the client
          const projects = await Project.find({ clientId }).populate('documents');
    
          if (!projects || projects.length === 0) {
            return errorResponse(res, 404, "No projects found for the client");
          }
    
          // Extract all unique users assigned to the documents in these projects
          const assignedUsers = projects.reduce((users, project) => {
            project.documents.forEach(document => {
              if (document.Assigned && !users.find(u => u._id.toString() === document.Assigned._id.toString())) {
                users.push(document.Assigned);
              }
            });
            return users;
          }, []);
    
          successResponse(res, 200, assignedUsers, "User details fetched successfully");
        } catch (error) {
          next(error);
        }
      }
      async getDocumentWithUser(req, res, next) {
        try {
          const documentId = req.body.documentId;
          const userId = req.user._id;
    
          // Find the document by its ID
          const document = await Document.findById(documentId).populate('Projetc').populate('Assigned');
    
          if (!document) {
            return errorResponse(res, 404, "Document not found");
          }
    
          const projectId = document.Project._id;
    
          // Find the user's projects
          const user = await User.findById(userId).populate('projects');
    
          if (!user) {
            return errorResponse(res, 404, "User not found");
          }
    
          const isUserProject = user.projects.some(project => project._id.toString() === projectId.toString());
    
          if (!isUserProject) {
            return errorResponse(res, 403, "User does not own the project associated with the document");
          }
    
          const assignedUser = document.Assigned;
    
          if (!assignedUser) {
            return errorResponse(res, 404, "No user assigned to the document");
          }
    
          const result = {
            documentId: documentId,
            projectId: projectId,
            userData:assignedUser
          };
    
          successResponse(res, 200, result, "User details fetched successfully with associated Document");
        } catch (error) {
          next(error);
        }
      }
    
    
}

const ClienttApiController = new ClientAPI();
module.exports = ClienttApiController;
