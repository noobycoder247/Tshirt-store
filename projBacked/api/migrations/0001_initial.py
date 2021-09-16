from django.db import migrations
from ..user.models import CustomUser

class Migration(migrations.Migration):
    def seed_data(apps, schema_editor):
        user = CustomUser(name="sandip", email="sandip@gmail.com", is_staff=True, is_superuser=True,
                          phone="9974599357", gender="Male")
        user.set_password("sandip123")
        user.save()

    dependencies = [

    ]

    operations = [migrations.RunPython(seed_data),

    ]
