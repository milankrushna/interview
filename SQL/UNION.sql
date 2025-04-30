SELECT 
    ha.id AS asset_id, 
    'hardware' AS asset_type, 
    ha.name AS asset_name, 
    COALESCE(e.email, 'unassigned') AS employee_email
FROM 
    hardware_asset ha
LEFT JOIN 
    Employee e ON ha.empId = e.id
WHERE 
    ha.is_active = 1

UNION ALL

SELECT 
    sa.id AS asset_id, 
    'software' AS asset_type, 
    sa.name AS asset_name, 
    COALESCE(e.email, 'unassigned') AS employee_email
FROM 
    software_asset sa
LEFT JOIN 
    Employee e ON sa.empId = e.id
WHERE 
    sa.is_active = 1

ORDER BY 
    asset_type ASC,  -- First, group by asset type: 'hardware' comes before 'software'
    CAST(SUBSTRING(asset_id FROM POSITION('#' IN asset_id) + 1) AS UNSIGNED) ASC;  -- Then, sort by the numeric part of asset_id in ascending order
