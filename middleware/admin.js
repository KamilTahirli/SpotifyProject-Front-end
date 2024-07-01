export default function ({ $auth, redirect }) {
  if (!$auth.user || $auth.user.role_id !== 1) {
    return redirect('/');
  }
}
