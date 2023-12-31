# Generated by Django 4.1.7 on 2023-11-19 11:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('api', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='teacher',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='courses_owned_by_teacher', to=settings.AUTH_USER_MODEL, to_field='user_name', verbose_name='Owner'),
        ),
        migrations.AddField(
            model_name='student',
            name='username',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='courses_owned_by_student', to=settings.AUTH_USER_MODEL, to_field='user_name', verbose_name='Owner'),
        ),
        migrations.AddField(
            model_name='course',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='courses_owned', to=settings.AUTH_USER_MODEL, to_field='user_name', verbose_name='Owner'),
        ),
        migrations.AddField(
            model_name='course',
            name='students',
            field=models.ManyToManyField(blank=True, related_name='enrolled_courses', to='api.student'),
        ),
        migrations.AddField(
            model_name='course',
            name='teacher',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='courses_taught', to='api.teacher', to_field='username', verbose_name='Teacher'),
        ),
    ]
