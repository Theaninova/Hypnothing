# Pitfalls

## Angular Bugs

* If you have an object literal in an Angular Template, DO NOT add a trailing comma.
  This will result in Angular rejecting the template with a seemingly unrelated
  error message.
