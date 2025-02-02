import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DbmanagerService } from './dbmanager.service';
//import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/attendance/dto/create-user.dto';

@ApiTags('DbManager')
@Controller('dbmanager')
export class DbmanagerController {
	constructor(private readonly dbmanagerService: DbmanagerService) { }

	@UseGuards(JwtAuthGuard)
	@Post('/user') //삭제 예정
	createUser(@Body() createUserDto: CreateUserDto) {
		console.log(`[ POST /dbmanager/user ] requested.`);
		return this.dbmanagerService.createUser(createUserDto);
	}

	@UseGuards(JwtAuthGuard)
	@Post('/set/totalMonthInfo/:intraId') // 해달 달의 정보와 그달의 모든 일자에 대한 정보를 데이터로 남겨논다 //크론
	setTotalMonthInfo(@Param("intraId") intraId: string) {
		console.log(`[ POST /dbmanager/set/totalMonthInfo/${intraId} ] requested.`);
		return this.dbmanagerService.setTotalMonthInfo(intraId);
	}

	// temp
	// @Post('/set/monthInfo/withDayInfos')
	// setMonthInfoWithDayInfos() {
	// 	return this.dbmanagerService.setMonthInfo();
	// }

	@UseGuards(JwtAuthGuard)
	@Post("/test/setcurrent")
	testSetCurrent() {
		console.log(`[ POST /dbmanager/test/setcurent ]`);
		this.dbmanagerService.upDateThisMonthCurrentAttendance();
	}

	@UseGuards(JwtAuthGuard)
	@Post('/test/createMockUp')
	tt() {
		console.log(`[ POST /dbmanager/test/createMockUp ]`);
		this.dbmanagerService.createMockUp()
	}

	@UseGuards(JwtAuthGuard)
	@Post('test/:intraId/:num/setatc')
	ILikeTT(@Param("intraId, num") intraId: string, num: number) {
		console.log(`[ POST /dbmanager/test/${intraId}/${num}/setatc ]`);
		this.dbmanagerService.atc(intraId, num);
	}
}
