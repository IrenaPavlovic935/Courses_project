from django.db import models
from user.models import NewUser


class Student(models.Model):
    first_name = models.CharField(max_length=50, verbose_name="First Name")
    last_name = models.CharField(max_length=50, verbose_name="Last Name")
    gender = models.CharField(max_length=10, verbose_name="Gender")
    email = models.EmailField(verbose_name="Email")
    city = models.CharField(max_length=50, blank=True, verbose_name="City")
    street = models.CharField(max_length=100, blank=True, verbose_name="Street")
    address = models.CharField(max_length=100, blank=True, verbose_name="Address")
    date_of_birth = models.DateField(verbose_name="Date of Birth")
    username = models.ForeignKey(NewUser, on_delete=models.CASCADE, related_name='courses_owned_by_student', verbose_name="Owner", to_field="user_name")
    def __str__(self):
        return f"{self.username}"


class Teacher(models.Model):
    username = models.CharField(max_length=150, unique=True, verbose_name="Username") 
    first_name = models.CharField(max_length=50, verbose_name="First Name")
    last_name = models.CharField(max_length=50, verbose_name="Last Name")
    gender = models.CharField(max_length=10, verbose_name="Gender")
    email = models.EmailField(verbose_name="Email")
    city = models.CharField(max_length=50, blank=True, verbose_name="City")
    street = models.CharField(max_length=100, blank=True, verbose_name="Street")
    address = models.CharField(max_length=100, blank=True, verbose_name="Address")
    owner = models.ForeignKey(NewUser, on_delete=models.CASCADE, related_name='courses_owned_by_teacher', verbose_name="Owner", to_field="user_name")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Course(models.Model):
    title = models.CharField(max_length=100, verbose_name="Title")
    start_date = models.DateField(verbose_name="Start Date")
    end_date = models.DateField(verbose_name="End Date")
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='courses_taught', verbose_name="Teacher",to_field="username")
    description = models.TextField(blank=True, verbose_name="Description")
    owner = models.ForeignKey(NewUser, on_delete=models.CASCADE, related_name='courses_owned', verbose_name="Owner", to_field="user_name")
    students = models.ManyToManyField(Student, related_name='enrolled_courses', blank=True)
    def __str__(self):
        return self.title
