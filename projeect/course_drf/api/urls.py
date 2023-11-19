from django.urls import path
from .views import apiOwerview, course_list, course_detail,course_create, course_update, course_delete, enroll_student
from .views import teacher_list, teacher_detail, teacher_create, teacher_update, teacher_delete
from .views import student_list, student_create, student_detail, student_update, student_delete

urlpatterns = [
    path('', apiOwerview, name='api-overview'),
     # Course URLs
    path('course-list/', course_list, name='course-list'), 
    path('course-detail/<str:pk>/', course_detail, name='course-detail'), 
    path('course-create/', course_create, name='course-create'), 
    path('course-update/<str:pk>/', course_update, name='course-update'), 
    path('course-delete/<str:pk>/', course_delete, name='course-delete'),
    path('enroll-student/', enroll_student, name='enroll_student'),
     # Teacher URLs
    path('teacher-list/', teacher_list, name='teacher-list'),
    path('teacher-detail/<str:pk>/', teacher_detail, name='teacher-detail'),
    path('teacher-create/', teacher_create, name='teacher-create'),
    path('teacher-update/<str:pk>/', teacher_update, name='teacher-update'),
    path('teacher-delete/<str:pk>/', teacher_delete, name='teacher-delete'),
      # Student URLs
    path('student-list/', student_list, name='student-list'),
    path('student-detail/<str:pk>/', student_detail, name='student-detail'),
    path('student-create/', student_create, name='student-create'),
    path('student-update/<str:pk>/', student_update, name='student-update'),
    path('student-delete/<str:pk>/', student_delete, name='student-delete'),

]
