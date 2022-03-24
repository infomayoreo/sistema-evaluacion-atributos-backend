
import db from "../../db";


export const getUserPermissions = async (userId:number) => {
    const [results, metadata]  = await db.query(
    `SELECT DISTINCT (systemOption.system_option_id) AS id,
        systemOption.name AS name,
        systemOption.description AS description,
        ( systemOption.activate AND
            ( case
                WHEN (permissionByUser.allow_permission is null)
                    THEN permissionByLevel.activate AND permissionByLevel.allow_permission
                    ELSE permissionByUser.activate AND permissionByUser.allow_permission
              END
            )
         ) AS allow
    FROM system_options AS systemOption
        LEFT JOIN permissions_by_level_access permissionByLevel ON systemOption.system_option_id = permissionByLevel.system_option_id
        LEFT JOIN permissions_by_user permissionByUser ON systemOption.system_option_id = permissionByUser.system_option_id
        LEFT JOIN users AS usersP ON  permissionByUser.user_id  = usersP.user_id
	    LEFT JOIN users AS users ON permissionByLevel.level_access_id = users.level_access_id
    WHERE  usersP.user_id = :userPId OR users.user_id = :userId;`
    , {
        replacements: {
            userPId:userId,
            userId:userId
        } 
    });

    return results;
}