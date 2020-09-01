### Installation

`npm install -S @reactive-underground/permissions`


### Use as nestjs module
```typescript
imports: [
    PermissionModule.forRoot({
        repository: {
            role: SqlRoleRepository,
            permission: SqlPermissionRepository
        },
        controller: {
            prefix: "api/v1"
        },
        root: {
            name: 'root'
        }
    })
]
```

### Permission Decorator

```typescript
@Controller("app")
export class AppController {

  @Permissions("app.test")
  @Get("test")  
  public test(): string {
    return "test";
  }
}
```

### Create roles 

```typescript
export class AppModule implements OnModuleInit {
    constructor(
        private readonly roleService: RoleService
    ) {}

    public async onInit() {
        try {
            await this.roleService.create({
                name: 'root',
                persistence: true,
                title: 'Root'
            })
        } catch (e) {
            // role already exists
        }    

    }
}
```
