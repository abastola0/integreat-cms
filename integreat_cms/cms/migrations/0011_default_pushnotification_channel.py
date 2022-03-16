# Generated by Django 3.2.12 on 2022-03-16 09:34

from django.db import migrations, models


class Migration(migrations.Migration):
    """
    Migration file to set "news" as default push notification channel
    """

    dependencies = [
        ("cms", "0010_page_api_token"),
    ]

    operations = [
        migrations.AlterField(
            model_name="pushnotification",
            name="channel",
            field=models.CharField(
                choices=[("news", "News")],
                default="news",
                max_length=60,
                verbose_name="channel",
            ),
        ),
    ]
