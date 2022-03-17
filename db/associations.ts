import * as DataBaseModels from './models';



export const setAssociations = (): void => {
    
    /*
    DataBaseModels.AttributeTypeDAO.hasMany(DataBaseModels.AttributeDAO, { 
        foreignKey: {
            name:'attributeTypeId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.AttributeDAO.belongsTo (DataBaseModels.AttributeTypeDAO, { 
        foreignKey: {
            name:'attributeTypeId',
            allowNull: false
        }
    });
    
    DataBaseModels.AttributeDAO.hasMany(DataBaseModels.AttributeRangeDAO, {
        foreignKey: {
            name:'attributeId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.AttributeRangeDAO.belongsTo(DataBaseModels.AttributeDAO, {
        foreignKey: {
            name:'attributeId',
            allowNull: false
        }
    });

    DataBaseModels.AttributeDAO.hasMany(DataBaseModels.AttributeToEvaluteByMeetingDAO, {
        foreignKey: {
            name:'attributeId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.AttributeToEvaluteByMeetingDAO.belongsTo(DataBaseModels.AttributeDAO, {
        foreignKey: {
            name:'attributeId',
            allowNull: false
        }
    });

    DataBaseModels.AttributeDAO.hasMany(DataBaseModels.AttributeToEvaluateByParticipantDAO, {
        foreignKey: {
            name:'attributeId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.AttributeToEvaluateByParticipantDAO.belongsTo(DataBaseModels.AttributeDAO, {
        foreignKey: {
            name:'attributeId',
            allowNull: false
        }
    });

    DataBaseModels.AttributeDAO.hasMany(DataBaseModels.ParticipantEvaluationPeriodDetailDAO, {
        foreignKey: {
            name:'attributeId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.ParticipantEvaluationPeriodDetailDAO.belongsTo(DataBaseModels.AttributeDAO, {
        foreignKey: {
            name:'attributeId',
            allowNull: false
        }
    });

    DataBaseModels.AttributeRangeDAO.hasMany(DataBaseModels.MeetingValueDetailDAO, {
        foreignKey: {
            name:'valueRangeId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.MeetingValueDetailDAO.belongsTo(DataBaseModels.AttributeRangeDAO, {
        foreignKey: {
            name:'valueRangeId',
            allowNull: false
        }
    });
    
    DataBaseModels.AttributeToEvaluteByMeetingDAO.hasMany(DataBaseModels.PermissionToEvaluateMeetingAttributeDAO, {
        foreignKey: {
            name:'meetingAttributeToEvaluateId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.PermissionToEvaluateMeetingAttributeDAO.belongsTo(DataBaseModels.AttributeToEvaluteByMeetingDAO, {
        foreignKey: {
            name:'meetingAttributeToEvaluateId',
            allowNull: false
        }
    });
    
    DataBaseModels.AttributeToEvaluateByParticipantDAO.hasMany(DataBaseModels.PermissionToEvaluateParticipantAttributeDAO, {
        foreignKey: {
            name:'participantAttributeToBeEvaluateId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.PermissionToEvaluateParticipantAttributeDAO.belongsTo(DataBaseModels.AttributeToEvaluateByParticipantDAO, {
        foreignKey: {
            name:'participantAttributeToBeEvaluateId',
            allowNull: false
        }
    });

    DataBaseModels.AttributeValueDAO.hasMany(DataBaseModels.AttributeRangeDAO, {
        foreignKey: {
            name:'attributeValueId',
            allowNull: false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.AttributeRangeDAO.belongsTo(DataBaseModels.AttributeValueDAO, {
        foreignKey: {
            name:'attributeValueId',
            allowNull: false
        }
    });
    
    DataBaseModels.DataSourceDAO.hasMany(DataBaseModels.PersonDAO, {
        foreignKey: {
            name:'dataSourceId',
            allowNull:false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.PersonDAO.belongsTo(DataBaseModels.DataSourceDAO, {
        foreignKey: {
            name:'dataSourceId',
            allowNull: false
        }
    });

    DataBaseModels.LevelAccessDAO.hasMany(DataBaseModels.UserDAO, {
        foreignKey: {
            name:'levelAccessId',
            allowNull:false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.UserDAO.belongsTo(DataBaseModels.LevelAccessDAO, {
        foreignKey: {
            name:'levelAccessId',
            allowNull:false
        }
    });
    
    DataBaseModels.LevelAccessDAO.hasMany(DataBaseModels.PermissionLevelAccessDAO, {
        foreignKey: {
            name:'levelAccessId',
            allowNull:false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.PermissionLevelAccessDAO.belongsTo(DataBaseModels.LevelAccessDAO, {
        foreignKey: {
            name:'levelAccessId',
            allowNull:false
        }
    });

    DataBaseModels.MeetingDAO.hasMany(DataBaseModels.AttributeToEvaluteByMeetingDAO, {
        foreignKey: {
            name:'meetingId',
            allowNull:false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION' 
    });
    DataBaseModels.AttributeToEvaluteByMeetingDAO.belongsTo(DataBaseModels.MeetingDAO, {
        foreignKey: {
            name:'meetingId',
            allowNull:false
        } 
    });

    DataBaseModels.MeetingDAO.hasMany(DataBaseModels.MeetingDAO, {
        foreignKey: {
            name:'previusMeetingId',
            allowNull:true
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION' 
    });
    DataBaseModels.MeetingDAO.belongsTo(DataBaseModels.MeetingDAO, {
        foreignKey: {
            name:'previusMeetingId',
            allowNull:true
        } 
    });

    DataBaseModels.MeetingDAO.hasMany(DataBaseModels.ParticipantDAO, {
        foreignKey: {
            name:'meetingId',
            allowNull:false
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION' 
    });
    DataBaseModels.ParticipantDAO.belongsTo(DataBaseModels.MeetingDAO, {
        foreignKey: {
            name:'meetingId',
            allowNull:false
        } 
    });

    DataBaseModels.MeetingPlatformDAO.hasMany(DataBaseModels.MeetingDAO, {
        foreignKey: {
            allowNull:false,
            name:'meetingPlaformId'
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.MeetingDAO.belongsTo(DataBaseModels.MeetingPlatformDAO, {
        foreignKey: {
            allowNull:false,
            name:'meetingPlaformId'
        }
    });
    
    DataBaseModels.MeetingValueHeaderDAO.hasMany(DataBaseModels.MeetingValueDetailDAO, {
        foreignKey: {
            allowNull:false,
            name:'meetingValueHeaderId'
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.MeetingValueDetailDAO.belongsTo(DataBaseModels.MeetingValueHeaderDAO, {
        foreignKey: {
            allowNull:false,
            name:'meetingValueHeaderId'
        }
    });

    DataBaseModels.ParticipantDAO.hasMany(DataBaseModels.AttributeToEvaluateByParticipantDAO, {
        foreignKey: {
            allowNull:false,
            name:'participantToBeEvaluateId'
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.AttributeToEvaluateByParticipantDAO.belongsTo(DataBaseModels.ParticipantDAO, {
        foreignKey: {
            allowNull:false,
            name:'participantToBeEvaluateId'
        }
    });

    DataBaseModels.ParticipantDAO.hasMany(DataBaseModels.MeetingValueHeaderDAO, {
        foreignKey: {
            allowNull:false,
            name:'participantEvaluatorId'
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.MeetingValueHeaderDAO.belongsTo(DataBaseModels.ParticipantDAO, {
        foreignKey: {
            allowNull:false,
            name:'participantEvaluatorId'
        }
    });

    DataBaseModels.ParticipantDAO.hasMany(DataBaseModels.PermissionToEvaluateMeetingAttributeDAO, {
        foreignKey: {
            allowNull:false,
            name:'participantEvaluatorId'
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.PermissionToEvaluateMeetingAttributeDAO.belongsTo(DataBaseModels.ParticipantDAO, {
        foreignKey: {
            allowNull:false,
            name:'participantEvaluatorId'
        }
    });

    DataBaseModels.ParticipantDAO.hasMany(DataBaseModels.PermissionToEvaluateParticipantAttributeDAO, {
        foreignKey: {
            allowNull:false,
            name:'evaluatorParticipantId'
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.PermissionToEvaluateParticipantAttributeDAO.belongsTo(DataBaseModels.ParticipantDAO , {
        foreignKey: {
            allowNull:false,
            name:'evaluatorParticipantId'
        }
    });

    DataBaseModels.ParticipantDAO.hasMany(DataBaseModels.ParticipantValueHeaderDAO, {
        foreignKey: {
            allowNull:false,
            name:'evaluateByParticipantId'
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.ParticipantValueHeaderDAO.belongsTo(DataBaseModels.ParticipantDAO, {
        foreignKey: {
            allowNull:false,
            name:'evaluateByParticipantId'
        }
    });

    DataBaseModels.ParticipantDAO.hasMany(DataBaseModels.ParticipantValueHeaderDAO, {
        foreignKey: {
            allowNull:false,
            name:'participantToEvaluateId'
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.ParticipantValueHeaderDAO.belongsTo(DataBaseModels.ParticipantDAO, {
        foreignKey: {
            allowNull:false,
            name:'participantToEvaluateId'
        }
    });

    DataBaseModels.ParticipantEvaluationPeriodHeaderDAO.hasMany(DataBaseModels.ParticipantEvaluationPeriodDetailDAO, {
        foreignKey: {
            allowNull:false,
            name:'participantEvaluationPeriodHeaderId'
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.ParticipantEvaluationPeriodDetailDAO.belongsTo(DataBaseModels.ParticipantEvaluationPeriodHeaderDAO, {
        foreignKey: {
            allowNull:false,
            name:'participantEvaluationPeriodHeaderId'
        }
    });

    DataBaseModels.ParticipantEvaluationPeriodHeaderDAO.hasMany(DataBaseModels.ParticipantAttributeValueDetailDAO, {
        foreignKey: {
            allowNull:false,
            name:'participantEvaluationPeriodId'
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.ParticipantAttributeValueDetailDAO.belongsTo(DataBaseModels.ParticipantEvaluationPeriodHeaderDAO, {
        foreignKey: {
            allowNull:false,
            name:'participantEvaluationPeriodId'
        }
    });

    DataBaseModels.ParticipantValueHeaderDAO.hasMany(DataBaseModels.ParticipantAttributeValueDetailDAO, {
        foreignKey: {
            allowNull:false,
            name:'participantValueHeaderId'
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.ParticipantAttributeValueDetailDAO.belongsTo(DataBaseModels.ParticipantValueHeaderDAO, {
        foreignKey: {
            allowNull:false,
            name:'participantValueHeaderId'
        }
    });

    DataBaseModels.PermissionToEvaluateMeetingAttributeDAO.hasMany(DataBaseModels.MeetingValueDetailDAO, {
        foreignKey: {
            allowNull:false,
            name:'participantWithPermissionsToEvalMeetingAttributeId'
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.MeetingValueDetailDAO.belongsTo(DataBaseModels.PermissionToEvaluateMeetingAttributeDAO, {
        foreignKey: {
            allowNull:false,
            name:'participantWithPermissionsToEvalMeetingAttributeId'
        }
    });

    DataBaseModels.PermissionToEvaluateParticipantAttributeDAO.hasMany(DataBaseModels.ParticipantAttributeValueDetailDAO, {
        foreignKey: {
            allowNull:false,
            name:'participantWithPermissionsToEvalAnotherParticpantAttributeId'
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.ParticipantAttributeValueDetailDAO.belongsTo(DataBaseModels.PermissionToEvaluateParticipantAttributeDAO, {
        foreignKey: {
            allowNull:false,
            name:'participantWithPermissionsToEvalAnotherParticpantAttributeId'
        }
    });

    DataBaseModels.PersonDAO.hasMany(DataBaseModels.ParticipantDAO, {
        foreignKey: {
            allowNull:false,
            name:'personId'
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.ParticipantDAO.belongsTo(DataBaseModels.PersonDAO, {
        foreignKey: {
            allowNull:false,
            name:'personId'
        }
    });

    DataBaseModels.PersonDAO.hasMany(DataBaseModels.ParticipantValueHeaderDAO, {
        foreignKey: {
            allowNull:false,
            name:'personId'
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.ParticipantValueHeaderDAO.belongsTo(DataBaseModels.PersonDAO, {
        foreignKey: {
            allowNull:false,
            name:'personId'
        }
    });

    DataBaseModels.SystemAuditableProcessDAO.hasMany(DataBaseModels.AuditUserDAO, {
        foreignKey: {
            allowNull:false,
            name:'auditableProcessId'
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.AuditUserDAO.belongsTo(DataBaseModels.SystemAuditableProcessDAO, {
        foreignKey: {
            allowNull:false,
            name:'auditableProcessId'
        }
    });

    DataBaseModels.SystemOptionDAO.hasMany(DataBaseModels.PermissionLevelAccessDAO,{
        foreignKey: {
            allowNull:false,
            name:'systemOptionId'
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.PermissionLevelAccessDAO.belongsTo(DataBaseModels.SystemOptionDAO, {
        foreignKey: {
            allowNull:false,
            name:'systemOptionId'
        }
    });

    DataBaseModels.SystemOptionDAO.hasMany(DataBaseModels.PermissionByUserDAO, {
        foreignKey: {
            allowNull:false,
            name:'systemOptionId'
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.PermissionByUserDAO.belongsTo(DataBaseModels.SystemOptionDAO, {
        foreignKey: {
            allowNull:false,
            name:'systemOptionId'
        }
    });

    DataBaseModels.UserDAO.hasMany(DataBaseModels.AuditUserDAO, {
        foreignKey: {
            allowNull:false,
            name:'userId'
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.AuditUserDAO.belongsTo(DataBaseModels.UserDAO, {
        foreignKey: {
            allowNull:false,
            name:'userId'
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });

    DataBaseModels.UserDAO.hasMany(DataBaseModels.MeetingDAO, {
        foreignKey: {
            allowNull:false,
            name:'createByUserId'
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.MeetingDAO.belongsTo(DataBaseModels.UserDAO, {
        foreignKey: {
            allowNull:false,
            name:'createByUserId'
        }
    });

    DataBaseModels.UserDAO.hasMany(DataBaseModels.PermissionByUserDAO, {
        foreignKey: {
            allowNull:false,
            name:'userId'
        }, 
        onDelete: 'NO ACTION', 
        onUpdate: 'NO ACTION'
    });
    DataBaseModels.PermissionByUserDAO.belongsTo(DataBaseModels.UserDAO, {
        foreignKey: {
            allowNull:true,
            name:'userId'
        }
    });

    DataBaseModels.UserDAO.hasOne(DataBaseModels.PersonDAO, {
        foreignKey: {
            allowNull:true,
            name:'userId'
        }
    });
    DataBaseModels.PersonDAO.belongsTo(DataBaseModels.UserDAO, {
        foreignKey: {
            allowNull:true,
            name:'userId'
        }
    });
*/
}