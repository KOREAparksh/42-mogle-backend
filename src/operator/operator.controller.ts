import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { OperatorService } from './operator.service';
import { SetTodayWordDto } from './dto/today_Word.dto';
import { UpdateUserAttendanceDto } from './dto/updateUserAttendance.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Operator')
@Controller('operator')
export class OperatorController {
	constructor(private readonly operatorService: OperatorService) {}
	
	/**
	 * PATCH /operator/setTodayWord
	 */
	@Patch("/setTodayWord") // 오늘의 단어 설정
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth('access-token')
	@ApiOperation({summary: 'set today word'})
	@ApiResponse({
		status: 201, // todo: consider
		description: 'Success', 
	})
	@ApiResponse({
		status: 401,
		description: 'Error: Unauthorized (Blocked by JwtAuthGuard)'
	})
	settodayword(@Body() setTodayWordDto: SetTodayWordDto) {
		console.log(`[ PATCH /operator/setTodayWord ] requested.`);
		console.log(`setTodayWordDto.intraId: [${setTodayWordDto.intraId}]`);
		console.log(`setTodayWordDto.todayWord: [${setTodayWordDto.todayWord}]`);
		this.operatorService.setTodayWord(setTodayWordDto);
	}

	/**
	 * POST /operator/update/user/attendance
	 */
	@Post("/update/user/attendance") // 유저의 출석데이터를 임의로 추가함
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth('access-token')
	@ApiOperation({summary: 'add a user attendance'})
	@ApiResponse({
		status: 201, 
		description: 'Success', 
		// todo: Set type using dto
	})
	@ApiResponse({
		status: 401,
		description: 'Error: Unauthorized (Blocked by JwtAuthGuard)'
	})
	updateUserAttendance(@Body() updateUserAttendanceDto: UpdateUserAttendanceDto) {
		console.log(`[ POST /operator/update/user/attendance ] requested.`);
		console.log(`updateUserAttendanceDto.intraId: [${updateUserAttendanceDto.intraId}]`);
		console.log(`updateUserAttendanceDto.year: [${updateUserAttendanceDto.year}]`);
		console.log(`updateUserAttendanceDto.month: [${updateUserAttendanceDto.month}]`);
		console.log(`updateUserAttendanceDto.day: [${updateUserAttendanceDto.day}]`);
		return this.operatorService.updateUserAttendance(updateUserAttendanceDto);
	}

	/**
	 * POST /operator/update/users/attendanceInfo
	 */
	@Post("/update/users/attendanceInfo") // 모든 유저의 출석정보를 업데이트함 //크론으로 대체
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth('access-token')
	@ApiOperation({summary: 'update all monthly users attendance info'})
	@ApiResponse({
		status: 201, 
		description: 'Success', 
	})
	@ApiResponse({
		status: 401,
		description: 'Error: Unauthorized (Blocked by JwtAuthGuard)'
	})
	updateAllusersAttendanceInfo() {
		console.log(`[ POST /operator/update/users/attendanceInfo ] requested.`);
		this.operatorService.updateUsersAttendanceInfo();
	}

	/**
	 * POST /operator/update/currentAttendanceCount
	 */
	@Post("/update/currentAttendanceCount") // 현재까지 개근 가능한 출석일수를 갱신 //크론으로 대체
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth('access-token')
	@ApiOperation({summary: 'update month currrent attendance count'})
	@ApiResponse({
		status: 201, 
		description: 'Success', 
	})
	@ApiResponse({
		status: 401,
		description: 'Error: Unauthorized (Blocked by JwtAuthGuard)'
	})
	updateCurrentAttendanceCount() {
		console.log(` [ POST /operator/update/currentAttendanceCount ] requested.`)
		this.operatorService.updateCurrentCount();
	}
}
