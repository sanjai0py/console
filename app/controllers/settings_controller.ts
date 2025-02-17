import User from '#models/user'
import { settingsValidator } from '#validators/settings_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class SettingsController {
  async edit({ inertia }: HttpContext) {
    return inertia.render('settings/edit')
  }

  async update({ auth, request, response, session }: HttpContext) {
    const { fullName, email, newPassword } = await request.validateUsing(settingsValidator)
    const user = auth.user!

    if (user.email !== email) {
      const emailExists = await User.query().where('email', email)
      if (emailExists) {
        session.flash('errors.email', 'Email already exists')
        return response.redirect().back()
      }
    }

    user.fullName = fullName
    user.email = email
    if (newPassword) {
      user.password = newPassword
    }
    await user.save()
    return response.redirect().back()
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.user!.delete()
    return response.redirect().toPath('/auth/sign_up')
  }
}
