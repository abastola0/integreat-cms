"""
The module is working as the view component for the dynamic data loading for the media library.
Therefore, it's managing the region permissions and connects the different data structures.
Especially, the root file, the use of the file defined in the Document and the different meta data.
"""
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView

from .media_context_mixin import MediaContextMixin

from ...decorators import (
    region_permission_required,
    staff_required,
    permission_required,
)


@method_decorator(login_required, name="dispatch")
@method_decorator(region_permission_required, name="dispatch")
@method_decorator(permission_required("cms.view_directory"), name="dispatch")
@method_decorator(permission_required("cms.view_mediafile"), name="dispatch")
class MediaListView(TemplateView, MediaContextMixin):
    """
    Class representing the media management and renders the dynamic data into the HTML template.
    """

    template_name = "media/media_list.html"
    #: The context dict passed to the template (see :class:`~django.views.generic.base.ContextMixin`)
    extra_context = {"current_menu_item": "media"}


@method_decorator(login_required, name="dispatch")
@method_decorator(staff_required, name="dispatch")
@method_decorator(permission_required("cms.view_directory"), name="dispatch")
@method_decorator(permission_required("cms.view_mediafile"), name="dispatch")
class AdminMediaListView(TemplateView, MediaContextMixin):
    """
    Class representing the media management and renders the dynamic data into the HTML template.
    """

    template_name = "media/media_list_admin.html"
    #: The context dict passed to the template (see :class:`~django.views.generic.base.ContextMixin`)
    extra_context = {"current_menu_item": "media"}
