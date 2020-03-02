# Generated by Django 3.0.3 on 2020-03-01 16:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20200301_1155'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='stock',
            name='products',
        ),
        migrations.AddField(
            model_name='stock',
            name='product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Product'),
        ),
    ]