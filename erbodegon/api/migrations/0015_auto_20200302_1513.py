# Generated by Django 3.0.3 on 2020-03-02 19:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_delivery_enviado_por'),
    ]

    operations = [
        migrations.RenameField(
            model_name='delivery',
            old_name='enviado_por',
            new_name='entregado_por',
        ),
    ]