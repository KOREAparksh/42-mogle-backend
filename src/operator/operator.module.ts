import { Module } from '@nestjs/common';
import { OperatorController } from './operator.controller';
import { OperatorService } from './operator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbmanagerService } from 'src/dbmanager/dbmanager.service';
import { UserInfo } from '../dbmanager/entities/user_info.entity';
import { MonthInfo } from '../dbmanager/entities/month_info.entity';
import { DayInfo } from '../dbmanager/entities/day_info.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [
      UserInfo, 
      MonthInfo, 
      DayInfo,
    ])
  ],
  controllers: [OperatorController],
  providers: [OperatorService, DbmanagerService]
})
export class OperatorModule {}
