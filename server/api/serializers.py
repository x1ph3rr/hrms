from rest_framework import serializers
from .models import Employee, Attendance

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    attendance_history = AttendanceSerializer(source='attendance', many=True, read_only=True)

    class Meta:
        model = Employee
        fields = ['id', 'employee_id', 'full_name', 'email', 'department', 'attendance_history']