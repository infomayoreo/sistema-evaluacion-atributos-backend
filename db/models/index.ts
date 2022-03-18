import { AttributeDAO, IAttribute, attributeAssociations} from './attribute'
import { AttributeProfileDAO, IAttributeProfile, attributeProfileAssociations } from './attributeProfile';
import { AttributeRangeDAO, IAttributeRange, attributeRangeAssociations } from './attributeRange';
import { AttributeTypeDAO, IAttributeType, attributeTypeAssociations } from './attributeType';
import { AttributeValueDAO, IAttributeValue, attributeValueAssociations } from './attributeValue';
import { AuditUserDetailDAO,IAuditUserDetail, auditUserDetailsAssociations } from './auditUserDetail';
import { AuditUserHeaderDAO, IAuditUserHeader, auditUserHeaderAssociations } from './auditUserHeader'
import { DataSourceDAO, IDataSource, dataSourceAssociations } from './dataSource';
import { EvaluationCommentDAO, IEvaluationComment, evaluationCommentAssociations} from './evaluationComment';
import { EvaluationTypeDAO,IEvaluationType, evaluationTypeAssociations } from './evaluationType';
import { GlobalSettingDAO, IGlobalSetting, globalSettingAssociations } from './globalSetting';
import { LevelAccessDAO, ILevelAccess, levelAccessAssociations } from './levelAccess';
import { MeetingDAO, IMeeting, meetingAssociations } from './meeting';
import { MeetingPlatformDAO, IMeetingPlatform, meetingPlatformAssociations } from './meetingPlatform';
import { MeetingValueDetailDAO, IMeetingValueDetail, meetingValueDetailAssociations } from './meetingValueDetail';
import { MeetingValueHeaderDAO, IMeetingValueHeader, meetingValueHeaderAssociations } from './meetingValueHeader';
import { ParticipantDAO, IParticipant, participantAssociations } from './participant';
import { PermissionLevelAccessDAO, IPermissionLevelAccess, permissionsByLevelAccessAssociations } from './permissionByLevelAccess';
import { PermissionByUserDAO, IPermissionByUser, permissionsByUserAssociations } from './permissionByUser';
import { PersonDAO, IPerson, personAssociations } from './person';
import { PersonExtraEvaluationDAO, IPersonExtraEvaluation, personExtraEvaluationAssociations } from './personExtraEvaluation';
import { PersonProficiencyDAO, IPersonProficiency, personProviciencyAssociations } from './personProficiency';
import { PersonValueDetailDAO, IPersonValueDetail, personValueDetailAssociations } from './personValueDetails';
import { PersonValueHeaderDAO, IPersonValueHeader } from './personValueHeader';
import { ProficiencyDAO, IProficiency, profiencyAssociations } from './proficiency';
import { ProficiencyRangeDAO, IProficiencyRange, profiencyRangeAssociations } from './proficiencyRange';
import { ProficiencyValueDAO, IProficiencyValue, profiencyValueAssociations } from './proficiencyValue';
import { ProfileTypeDAO, IProfileType, profileTyeAssociations } from './profileType';
import { SystemAuditableProcessDAO, ISystemAuditableProcess, systemAuditableProcessAssociations } from './systemAuditableProcess';
import { SystemOptionDAO, ISystemOption, systemOptionAssociations } from './systemOption';
import { UserDAO, IUser, userAssociations } from './user';

const associations:(()=>void)[] = [ 
    attributeAssociations,
    attributeProfileAssociations,
    attributeRangeAssociations,
    attributeTypeAssociations,
    attributeValueAssociations,
    auditUserDetailsAssociations,
    auditUserHeaderAssociations,
    dataSourceAssociations,
    evaluationCommentAssociations,
    evaluationTypeAssociations,
    globalSettingAssociations,
    levelAccessAssociations,
    meetingAssociations,
    meetingPlatformAssociations,
    meetingValueDetailAssociations,
    meetingValueHeaderAssociations,
    participantAssociations,
    permissionsByLevelAccessAssociations,
    permissionsByUserAssociations,
    personAssociations,
    personExtraEvaluationAssociations,
    personProviciencyAssociations,
    personValueDetailAssociations,
    profiencyAssociations,
    profiencyRangeAssociations,
    profiencyValueAssociations,
    profileTyeAssociations,
    systemAuditableProcessAssociations,
    systemOptionAssociations,
    userAssociations,
];

export {
    associations,
    AttributeDAO, IAttribute,
    AttributeProfileDAO, IAttributeProfile,
    AttributeRangeDAO, IAttributeRange,
    AttributeTypeDAO, IAttributeType,
    AttributeValueDAO, IAttributeValue,
    AuditUserDetailDAO, IAuditUserDetail,
    AuditUserHeaderDAO, IAuditUserHeader,
    DataSourceDAO, IDataSource,
    EvaluationCommentDAO, IEvaluationComment,
    EvaluationTypeDAO, IEvaluationType,
    GlobalSettingDAO, IGlobalSetting,
    LevelAccessDAO, ILevelAccess,
    MeetingDAO, IMeeting,
    MeetingPlatformDAO, IMeetingPlatform,
    MeetingValueDetailDAO, IMeetingValueDetail,
    MeetingValueHeaderDAO, IMeetingValueHeader,
    ParticipantDAO, IParticipant,
    PermissionLevelAccessDAO , IPermissionLevelAccess ,
    PermissionByUserDAO, IPermissionByUser,
    PersonDAO, IPerson,
    PersonExtraEvaluationDAO, IPersonExtraEvaluation,
    PersonProficiencyDAO, IPersonProficiency,
    PersonValueDetailDAO, IPersonValueDetail,
    PersonValueHeaderDAO , IPersonValueHeader,
    ProficiencyDAO, IProficiency,
    ProficiencyRangeDAO, IProficiencyRange,
    ProficiencyValueDAO, IProficiencyValue,
    ProfileTypeDAO, IProfileType,
    SystemAuditableProcessDAO, ISystemAuditableProcess,
    SystemOptionDAO, ISystemOption,
    UserDAO, IUser,
};
