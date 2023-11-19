
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Course
from .models import Student
from .models import Teacher
from .serializers import TeacherSerializer, StudentSerializer
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from user.models import NewUser

from .serializers import CourseSerializer
@api_view(['GET'])
def apiOwerview(request):
    api_urls={
        'List Course' : '/course-list/',
        'Course Detail' : '/course-detail/<str:pk>/',
        'Create Course' : '/course-create/',
        'Update Course' : '/course-update/<str:pk>/',
        'Delete Course' : '/course-delete/<str:pk>/',
        }     
    return Response(api_urls)

# STUDENTS VIEWS
@api_view(['GET'])
def student_list(request):
    students = Student.objects.all().order_by('-id')
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def student_detail(request, pk):
    student = get_object_or_404(Student, pk=pk)
    serializer = StudentSerializer(student, many=False)
    return Response(serializer.data)
from rest_framework import status

@api_view(['POST'])
def student_create(request):
    data = request.data
    existing_student = Student.objects.filter(username=data.get('username')).first()

    if existing_student:
        return Response({'error': 'Student s istim korisničkim imenom već postoji.'}, status=status.HTTP_409_CONFLICT)
    serializer = StudentSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['PUT'])
def student_update(request, pk):
    student = get_object_or_404(Student, pk=pk)
    serializer = StudentSerializer(student, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def student_delete(request, pk):
    student = get_object_or_404(Student, pk=pk)
    student.delete()
    return Response({"message": "Student deleted"}, status=204)



#COURSES VIEWS
@api_view(['GET'])
def course_list(request):
    course= Course.objects.all().order_by('-id')
    serializer= CourseSerializer(course, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def course_detail(request, pk):
    course = Course.objects.select_related('teacher').get(id=pk)  
    serializer = CourseSerializer(course, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def course_create(request):
    serializer = CourseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
   
@api_view(['PUT'])
def course_update(request, pk):
    course= Course.objects.get(id=pk)
    serializer= CourseSerializer(instance=course, data=request.data)
    print("ja sam request", request)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def course_delete(request, pk):
    try:
        course = Course.objects.get(id=pk)
    except Course.DoesNotExist:
        return Response({"error": "Course not found"}, status=404)

    course.delete()
    return Response({"message": "Course deleted"}, status=204)

@api_view(['POST'])
def enroll_student(request):
    try:
        course_id = request.data.get('course_id')
        student_username = request.data.get('student_username')
        course = get_object_or_404(Course, id=course_id)
        student = get_object_or_404(Student, username=student_username)
        if student in course.students.all():
            return Response({"error": "Student is already enrolled in the course"}, status=500)
        course.students.add(student)
        return Response({"message": "Student enrolled in the course"}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=400)




#TEACHER VIEWS
@api_view(['GET'])
def teacher_list(request):
    teachers = Teacher.objects.all().order_by('-id')
    serializer = TeacherSerializer(teachers, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def teacher_detail(request, pk):
    teacher = get_object_or_404(Teacher, pk=pk)
    serializer = TeacherSerializer(teacher, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def teacher_create(request):
    username = request.data.get('username')
    
    # Provjerite postoji li korisnik s istim korisničkim imenom
    existing_teacher = Teacher.objects.filter(username=username).first()
    
    if existing_teacher:
        return Response({"message": "Korisnik s istim korisničkim imenom već postoji."}, status=500)
    
    serializer = TeacherSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Učitelj je uspješno dodan."}, status=201)
    return Response({"message": "Došlo je do problema prilikom dodavanja učitelja."}, status=400)


@api_view(['PUT'])
def teacher_update(request, pk):
    teacher = get_object_or_404(Teacher, pk=pk)
    serializer = TeacherSerializer(teacher, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def teacher_delete(request, pk):
    teacher = get_object_or_404(Teacher, pk=pk)
    teacher.delete()
    return Response({"message": "Teacher deleted"}, status=204)