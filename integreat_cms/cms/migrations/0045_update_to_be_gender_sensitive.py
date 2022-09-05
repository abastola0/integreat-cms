# Generated by Django 3.2.16 on 2022-11-08 09:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    """
    Migration file to update fields to make them gender_sensitive
    """

    dependencies = [
        ("cms", "0044_alter_user_options"),
    ]

    operations = [
        migrations.AlterField(
            model_name="feedback",
            name="read_by",
            field=models.ForeignKey(
                blank=True,
                help_text="The account that marked this feedback as read. If the feedback is unread, this field is empty.",
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="feedback",
                to=settings.AUTH_USER_MODEL,
                verbose_name="marked as read by",
            ),
        ),
        migrations.AlterField(
            model_name="role",
            name="name",
            field=models.CharField(
                choices=[
                    ("MANAGEMENT", "Manager"),
                    ("EDITOR", "Editor"),
                    ("AUTHOR", "Author"),
                    ("EVENT_MANAGER", "Event manager"),
                    ("SERVICE_TEAM", "Service team"),
                    ("CMS_TEAM", "CMS team"),
                    ("APP_TEAM", "App team"),
                    ("MARKETING_TEAM", "Marketing team"),
                ],
                max_length=50,
                verbose_name="name",
            ),
        ),
    ]
