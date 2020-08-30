# Version 2.0

## Purposes
1. Customize endpoints
2. Support multiple databases (postgres, mongo, mysql, redis, file)
3. Customize guard handling
4. Fix naming

## Usage interface

### Module injection
```
import: [
    PermissionsModule
]
providers: [
    {
        provide: Interface(PERMISSION),
        useClass: FilePermissionRepository
    }   
]
```

### Endpoint customization
```
@PermissionController("/api/v1")
export class PermissionController {}

@RoleController("/api/v1")
export class RoleController {}
```
