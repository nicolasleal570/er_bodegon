# Generated by Django 3.0.3 on 2020-03-02 20:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_auto_20200302_1513'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cliente',
            name='is_available',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='empleado',
            name='is_available',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='is_available',
            field=models.BooleanField(default=True),
        ),
    ]
