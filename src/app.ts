import express, { Application as ExApplication, Handler } from 'express';
import cors from 'cors';
import { controllers } from './controllers.index';
import { IRouter } from './util/decorator/handlers.decorator';
import { container } from 'tsyringe';
import multer from 'multer';
import bodyParser from 'body-parser';
import { DataSource, Repository } from 'typeorm';
import { PostgresDataSource } from './data/sources/postgresDatasource';
import RoutesInfo from './util/constants/routesInfo.type';
import { MetadataKeys } from './util/decorator/metadata.keys';
import { Operation } from './operation/operation.entity';
import { Record } from './record/record.entity';
import { User } from './user/user.entity';
import config from './config';
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default class Server {
  private app: ExApplication;
  constructor() {
    this.app = express();

    this.registerContainers();
    this.middlewares();
    this.registerRouters();
  }

  private middlewares() {
    this.app.use(bodyParser.json());
    this.app.use(upload.single('file'));
    this.app.use(express.json());
    this.app.use(cors());
  }

  private registerContainers() {
    container.register<DataSource>('PgDataSource', { useValue: PostgresDataSource });
    container.register<Repository<Operation>>('OperationRepository', {
      useValue: PostgresDataSource.getRepository(Operation),
    });

    container.register<Repository<Record>>('RecordRepository', {
      useValue: PostgresDataSource.getRepository(Record),
    });

    container.register<Repository<User>>('UserRepository', {
      useValue: PostgresDataSource.getRepository(User),
    });
  }

  private registerRouters() {
    const info: RoutesInfo[] = [];
    controllers.forEach((controllerClass) => {
      const controllerInstance: { [handleName: string]: Handler } = container.resolve(controllerClass as any);
      const basePath: string = '/api' + Reflect.getMetadata(MetadataKeys.BASE_PATH, controllerClass);
      const routers: IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass);
      const exRouter = express.Router();
      routers.forEach(({ method, path, handlerName }) => {
        exRouter[method](path, controllerInstance[String(handlerName)].bind(controllerInstance));
        info.push({
          api: `${method.toLocaleUpperCase()} ${basePath + path}`,
          handler: `${controllerClass.name}.${String(handlerName)}`,
        });
      });
      this.app.use(basePath, exRouter);
    });
    console.table(info);
  }

  listen() {
    this.app.listen(config.port, () => {
      console.log('App listening on port ' + config.port);
    });
  }
}
