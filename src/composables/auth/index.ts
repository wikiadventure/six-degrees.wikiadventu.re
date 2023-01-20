import { User, UserManager, WebStorageStateStore } from 'oidc-client-ts'
import { onMounted, ref } from 'vue'

const userManager = new UserManager({
    authority: 'http://localhost:4000',
    client_id: '9c201800-416c-4551-977c-7598eb122ee2',
    redirect_uri: "https://six-degrees.wikiadventu.re/callback",
    response_type: 'code',
    scope: 'openid profile offline_access',
    post_logout_redirect_uri: window.location.origin,
    userStore: new WebStorageStateStore({ store: window.localStorage })
})

export function useAuth() {
    const user = ref<User | null>(null)

    const login = async () => {
        userManager.signinPopup()
    }

    const logout = () => {
        userManager.signoutSilent()
    }

    const getUser = async () => {
        user.value = await userManager.getUser()
    }

    onMounted(() => {
        userManager.events.addUserLoaded(getUser)
        userManager.events.addUserUnloaded(() => {
            user.value = null
        })
    })

    return { user, login, logout, userManager }
}