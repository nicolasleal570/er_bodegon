# Generated by Django 3.0.3 on 2020-03-02 13:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_auto_20200302_0026'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pago',
            name='divisa',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Divisa'),
        ),
    ]
