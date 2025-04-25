from django.urls import reverse
from django.test import Client
from pytest_django.asserts import assertContains, assertTemplateUsed
import pytest

CLIENT = Client()

@pytest.mark.django_db
def test_homepage_renders_darkmode_correctly():
    """
    Vérifie que :
    - la vue 'home' fonctionne
    - le bon template est utilisé
    - le bouton Dark Mode et le script JS sont bien intégrés
    """
    url = reverse('home')
    response = CLIENT.get(url)

    assert response.status_code == 200
    assertTemplateUsed(response, 'home.html')

    assertContains(response, 'id="theme-toggle"')
    assertContains(response, '🌙 Dark Mode')
    assertContains(response, 'js/theme-toggle.js')
