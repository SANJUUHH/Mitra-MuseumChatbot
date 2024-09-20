# Generated by Django 4.2.16 on 2024-09-19 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticket',
            name='ticket_id',
            field=models.CharField(max_length=10, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='ticket',
            name='visit_date',
            field=models.DateField(null=True),
        ),
    ]
