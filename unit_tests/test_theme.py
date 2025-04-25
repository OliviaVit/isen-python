from django.test import TestCase
from django.urls import reverse

class ThemeToggleUnitTests(TestCase):
    def setUp(self):
        self.response = self.client.get(reverse('home'))
        self.html = self.response.content.decode()

    def test_theme_toggle_button_is_present(self):
        self.assertContains(self.response, 'id="theme-toggle"')
        self.assertContains(self.response, '🌙 Dark Mode')

    def test_theme_toggle_button_classes(self):
        self.assertContains(self.response, 'btn-outline-light')
        self.assertContains(self.response, 'rounded-pill')
        self.assertContains(self.response, 'px-3')
        self.assertContains(self.response, 'py-1')

    def test_theme_toggle_button_is_inside_navbar(self):
        self.assertIn('<nav', self.html)
        self.assertIn('theme-toggle', self.html)
        self.assertIn('btn-outline-light', self.html)
