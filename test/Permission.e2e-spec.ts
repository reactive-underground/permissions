import { NestApplication } from "@nestjs/core";
import { Connection } from "typeorm";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { Permission, PermissionModule, PermissionService, Role } from "../src";
import { DatabaseModule } from "./tools/DatabaseModule";

/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class Permission
 */
describe("Permission test", () => {

    jest.setTimeout(10000000);

    let app: NestApplication;
    let connection: Connection;
    let permissionService: PermissionService;
    let roles: Role[];


    async function clearDatabase() {}

    async function initData() {
        permissionService = await app.get(PermissionService);

        roles = [
            new Role("same", "admin", true),
            new Role("some", "watch", true),
            new Role("onu", "una", true),
        ];

        await connection.getRepository(Role).save(roles);
    }

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [PermissionModule, DatabaseModule],
        })
            .compile();

        connection = moduleFixture.get(Connection);

        await clearDatabase();

        app = moduleFixture.createNestApplication();

        await app.init();

        await initData();
    });

    afterAll(async () => {
        await clearDatabase();
        await app.close();
    });

    describe("edit permission", () => {
        let permission: Permission;

        it("create permission for edit", async (done) => {
            permission = await permissionService.create({
                roleIds: [],
                permission: "test.role.changes",
                name: "Test role change"
            });

            expect(permission.getId()).toBeDefined();
            expect(permission.getRoles()).toHaveLength(0);

            done();
        })

        it("should be change roles", (done) => {
            return request(app.getHttpServer())
                .put("/api/v3/permission")
                .send({
                    id: permission.getId(),
                    roleIds: [roles[0].getId()],
                })
                .expect(200)
                .expect(async res => {
                    const {data, status} = res.body;

                    expect(status).toBeTruthy();
                    expect(data.roles[0].id).toBe(roles[0].getId());

                    const entity = await connection.getRepository(Permission).findOne(permission.getId());

                    expect(entity.getRoles()).toHaveLength(1);
                    expect(entity.getRoles()[0].getId()).toHaveLength(roles[0].getId());
                })
                .end(done)
        });
    })
})
