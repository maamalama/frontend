import indexStyles from './index.module.css'
import shared from '../shared.module.css'
import css from './holders.module.css'
import { useEffect, useMemo, useState } from 'react'
import { Column } from 'react-table'
import { TableData } from '../lib/types'
import { useRouter } from 'next/router'
import { BASE_URL } from '../data/constants'
import { UsersTable } from '../components/UsersTable'

let lobsters = [
  "https://storage.googleapis.com/opensea-static/opensea-profile/30.png",
  "https://storage.googleapis.com/opensea-static/opensea-profile/30.png",
  "https://lh3.googleusercontent.com/38LM0RjthorT2cCol9XhQLNiC_But3Co-cqCZOzaJvsK-l4XtGtG7Yyu3rPk2gsDQgD6OItNpMjhHCXRYjbQ5dTkvAEsBuEHRVOd=w275",
  "https://lh3.googleusercontent.com/LfvlXbsgck5tfUEum53rWMN0XakaFiwKHXXZivMSS6YRL7EOWvWzlyxfOmh2j9yUFjI_ATSEu4GQtrkR4PFeHS9upN8-7k3DXyH--Q=w275",
  "https://lh3.googleusercontent.com/mqyrH2Rr9j6TxISfMrRmF0l0uFbrRjoeuoiBkMMwIzIONTiCcIGSlmppAxntm8qGKiVymPb4pgMyHVqN--zUVUtDDho_fd4ABhjr=w275",
  "https://lh3.googleusercontent.com/VUKIxwWL-6Lv3JQSoNZ1YQUlRjhERJXYhd_9yV2wCZd_RiB3PXF_VGBWezbsbXevXKuEFGO4jW01GHhpcn0nkNxkXdPa3P_TD7uEIg=w275",
  "https://lh3.googleusercontent.com/LFfhKqaReuezJnA-hW5P2_Dgf0DVYH35RT2Bcd5cn7NmAcOmBsItKNEMGTT0on-gT0v_4cBh-V-vLRIGP8WWOG6wJ6NHRcGpZ5Jg2g=w275",
  "https://lh3.googleusercontent.com/koLB7y_YAkmZKeCpYQDlG21JVMjJZhCgu3WamfxndW4SB6sVEF0UchRtzqMAV_FrGmpaaV37twBkP-mpI_BlYKJ8t2KGIplnbIMDng=w275",
  "https://lh3.googleusercontent.com/W1GU70IrSttoyMRvOe_Obf3XXVMCRKh455JyESsLD37NLkno_AKJkAtdfdA57NnbU_bsSmUYFBJwSUy2j_WMLTx_0pSvX1MFHHkd=w275",
  "https://lh3.googleusercontent.com/MkgJEpSQ11OivsVX0s94oqUv4W8TyPPA41DelBqhsZcOPUNshjz8R9aoT-32S3JqZzfo_Y1LPpPj2NLiy5p2Qsfi34YU4ZmSOHISrFg=w275",
  "https://lh3.googleusercontent.com/s8laVcAq7ekxa81czh6SdOaR4MVWDy4frdzbVxoNMgHkjnUJWeXWg1UItMxC9guSL065TNchBSGB-YqE6JfhbRfFQuIIgBJxbrMmMlo=w275",
  "https://lh3.googleusercontent.com/Vwv1enY_tJR6l0RcPOOUFjjgL8u1FA6gfk5saS94be0bgbuIZUnf1QiZRDT7S7Wh-8Ioi0RAxaBt4oIZ2Og1LXa_1qbyG1ybKFpjvg=w275",
  "https://lh3.googleusercontent.com/D6VPSkWNMTdSzrUtprqxiuvN3_RXsAb1TWVhUFUkALfrKl1lAFWkQXFSsQl5OJ_RxFkaq_I6AcUQGq157ar8RFgOxWTR38GgKdcRBw=w275",
  "https://lh3.googleusercontent.com/LNCdQ8ZFVEG0m2vV8rX0yVIsjDVnWCt1M5-uhJUgF9ftH3uoFS5BYXCx_dGTSoII1yDjad9ejhyarqnFc_RBDRvI3zAuPtUMfoPoyQ=w275",
  "https://lh3.googleusercontent.com/3gPAPo59LyhgeMcnibQbw4JaamWr4N_qTlJcED2fxJKnnJPkZgMVIE5sDdAB56bwW4fI6Cn5araV-evIMAWKSBVh1v3Q9uDeubTWLV0=w275",
  "https://lh3.googleusercontent.com/9lQz8t6pGqWKG2Q-O_xHKAYAUHeR1eGJQPX68N44npGJZSZ8nN2inQhmuulOzTw1O_7UNm427rlsdlHmRjsh6kGPh1ita358Hdn6=w275",
  "https://lh3.googleusercontent.com/Wo6OvuZJvll7GmMjU7qsipIzl1EeUS2_APoaCA4_WVI2IFGdsJ8XONN0GZW4EYQ1ltHTOFpdxx5fc3aETuUocQfITjiNFJ_qy9nCOQ=w275",
  "https://lh3.googleusercontent.com/vrn5Dlis57efBVc0wNAE52dVWyCVbT2-29sQCjJBmkDhOzvPBZHyCHgvj4Y75olhTwFKedIw3K9Pel4Qb1I5vPAPo_sD3mXhFdrbcQ=w275",
  "https://lh3.googleusercontent.com/CN-JAKFo-3zGqyDi1YsvRiN-a9PY_Hmx_rKc5CCeSKmnygwnDCmdwNwPq7Ly0niuHRABdA8vDJrAVUJ1JcEpbp7LRbNfzCo9Ow5v5eU=w275",
  "https://lh3.googleusercontent.com/zhId-eYorEJ8VfV2vdrjBqN3LBNqtbYFg7t3wkWcdKRbSoyVqli8A5Y_nJgdtleEVnhen0LEnw2em1EfY9l4CtLQy2FxtuidRp1L0eI=w275",
  "https://lh3.googleusercontent.com/DGtkrpRB9w4bQuMOoWLS10ZPQ2l8wBQcybE_KraeTusRfzojvV-CRTQ0Uqwsss6eIDJAUNDxVNw0CZsC40yfonEvvai1dRnSl0p7=w275",
  "https://lh3.googleusercontent.com/UrYcGgyxgC0RiObIEMxQF9g_Bdmifq1uLlPGuK0hEGhU4zVbuzJ779k-7HN0N5nrX2bzEmjgn4w9liWFd94ytYSqYZCcgmz-qzo_gXs=w275",
  "https://lh3.googleusercontent.com/iA4eRz7svPvund-_JixJvXVb9EYWzgPLKK3K_EZT7QCNjdqu7KRLo-qXvVTZUD7CO_nNthVC0UgOhe1fULK8Jem2LQq-c6tdmgK9saA=w275",
  "https://lh3.googleusercontent.com/Arh-t5arARI8rWxuWlNHdZqqvRD-obGoGBKrbgAffxX7lbKER8-nTyw7QtgdNg58E-2H1RSjDjaw2dGnWXN07tyFVxbVbaiM3igDIQ=w275",
  "https://lh3.googleusercontent.com/Mqg_pWJt9TdDEqZGK98HcRKzr4z5J-YTGmM5_KocWXXP5onauVbuFf51NNSFXnwBVvulM88VX2P_DIyr1C-_ImHz-j_xuHHSO7OuaA=w275",
  "https://lh3.googleusercontent.com/BkD0JZbtuDtYmnaDNBQ6lSCmU5_Ezvmr7gn1U1gVYy_CYCbX8ZF79_dgQBYRoRDEfZMiDccLvzWSCcyzF4uC9jmWdBmVwBQnrgBbcQ=w275",
  "https://lh3.googleusercontent.com/Ut4LpcT9iJD5eT2A2calfCYommFtKywkHlFeA5dmrY3rWf9yfSMnr6WIIX5KAJpwDXD_6krC6x7EWCETaOZpC971DYA7OtPD8tVCdA=w275",
  "https://lh3.googleusercontent.com/CtyhMDYxTtsSMuTMoqM6IfrwgkAXr1Itd8u0mxAh_FVciOL2l0vgsaHfwHukQafjbHZLN37KhXmPhRNPtX7rxpg7y9HwX9QI5u2w31Q=w275",
  "https://lh3.googleusercontent.com/FgTePejNBLXzF8dtQUUdejBgyBE9fYupQX7roQFxju4T2PDVEnnadOLgH3TyOL5FmMmiOLz5H9nt0YyvShVc0r3GseVQhWB41K-6Ow=w275",
  "https://lh3.googleusercontent.com/pEKWmFqr7BwvFoIygXi9TG3cBcYEZiABKVyUFo-xWFvzzun5hufFLoksbdrJnwtnabM5U1ubwIcxQn0PpIC_ssWwXnwdsaIRGIChBg=w275",
  "https://lh3.googleusercontent.com/BWXurzc1IHGM3R4_t8WnrQRTBTJHcLmHYX-ET0_P1sdz0AwS7Y8UGDsqUge8Kqtftyj6j4HOkbVE2JAFUnZRWzhxu0s1uY4uNnoGXA=w275",
  "https://lh3.googleusercontent.com/T5-8oWCoDmk1_-QCMOsCunCCqCb9_VhIdWiE-FaB-Uos4_8-kpgXS7ohPeyHa1xTriSLu3k8P0KD_3u7U261zoJE6-josWCK5ACQzVM=w275",
  "https://lh3.googleusercontent.com/SXvvy9mL7rfXuqWiTJqN2EySKdt2KuhCjXv6gk-eIzvXyUWANI_4OyzLN-Bp0kuOSiuZg997pTYXcyNoKebSEGrsemi92jx6uOIe8g=w275",
  "https://lh3.googleusercontent.com/Rr8gN56QPeekwN-GAV92JtKM-cc0Gg0ODKEi-QEaWB75poTp1jFV0yOo1LP4PlMshqC5vQLmGVBsjvAVUwEjzSBqUSg7s_zSQUOD-g=w275",
  "https://lh3.googleusercontent.com/qJNM-fwyzpAnBfw8GGfvuOJh-5JS9NeC1iGavyOk84GowRo-sUhJX_CtCDZmO4gfawM1ZyDvrXbp4uEzDPx_71POcFuABB-cvK7q=w275",
  "https://lh3.googleusercontent.com/PLJUd3IM5GLyvR6gMJE2Jt-zGNMhwZQTEnpziNC4VbNCb6Z3VAIyB2Q1qgrZsOVi9irPW5qwIixUFJQN71w7uPHGREYNXuG4WF1RAQ=w275",
  "https://lh3.googleusercontent.com/doFlnDqqJDHAO85xYAqk7y_Q7Yi7WwVtZVcn8BxIYO6Ti0TCWQGiUAQVybp-HvPMvQKWAHuB6821OpWVd6QjTI4c5UtysmNSdKoodA=w275",
  "https://lh3.googleusercontent.com/wBKVhmP98PWH0pziZychKTd_Mrm4uv1kk_PmEQZBGpkP_z-djolgDwO4d6jLsB_0Vee9INMc3AZfXMwL1abBMvLC7rj1h9YBnZch=w275",
  "https://lh3.googleusercontent.com/pmoSquvJILky3rCCApZSK8zTCdNLypi4tJYTjCCzXNMrRC3zA0K5nEf2Mau_3QEnOGO68kiTq5GXpPscA9Dx959eL8D0cIjftjc4fA=w275",
  "https://lh3.googleusercontent.com/WgmKxJRLPqlq13Y0qIainGXOTXwhYto48ISOy3r5QMUJBc9PFSIXZAiXpwXPSsePEsrb9mfg8aLwxSaAu4XNyj7h1Ba0aNsZNzKcnQ=w275",
  "https://lh3.googleusercontent.com/jDB_0oMrrYyaRj3sGK42tOluHLx7ihF5Z1_w-sIYQBNYJpO2NKvLnr9Vd_X4flMOijckaBFcT2h2PwcxlhD7PRdEW9EIQkLdWMOiBio=w275",
  "https://lh3.googleusercontent.com/f8eQt4OK7xVkjraDetAbldhm6mTHdwSzYaFgo11JaBpCpEsSU9uJCc7_sRKQ6CsbL-h1QNqJgLwByLej8Yj9wWeJ5wqvCf71ijDX7XA=w275",
  "https://lh3.googleusercontent.com/o_AiR9l045_2xY7Vc3M02iXJblrfEZhk-vAWJDIjbvXjARWBf1k7I12g8fJ-Qf8XYuorgQ6NYPT9cKKmFbD8pfcigrQkZZJmAFErMA=w275",
  "https://lh3.googleusercontent.com/x6VsZTQsQym6-ISo2D-7fO1To9N0UfTgGoTLp4OJJRRJjPrmxta-H235JpV-4a0tnPZ5VuTkH0zLqz41SfT26gg9vh6yUNBNgms7=w275",
  "https://lh3.googleusercontent.com/kzH_MyMPLewUC6OjADoKUHxjDsMGBPg83C1yHwDjooeZCBOF2VfDxUUg_UDzWqrgaGdu-zXhwX7niXjooZkUTSarg5CydwTg9xvdmg=w275",
  "https://lh3.googleusercontent.com/GnnbJ3EsdRZUrKfKtTKwB3vPyW59kP0HzwHGO3HRxQEqerg_D4IAHcSGNXits3XPldyuC0cpCVD5UnRDS0x3CHqaVHnos4XmDKmT=w275",
  "https://lh3.googleusercontent.com/jNCt1_jicRqFexoTdK8Xs98lry1qWFUIhA1fi3MkpOXTOl9rbfvu6dqYQFrWHW3h9VKqKJOamab3ZwYFUNXCFHrglTIF7XBwH3j8bQ=w275",
  "https://lh3.googleusercontent.com/RUVzU2MXQijA9RcN-UTadZj90Bk7FkBxUakOdahO59gkiqjCsGkoMsg98NU4y8qIPLNo-JWb7oq0CgFVRSumxKStmKC91t4OtDua=w275",
  "https://lh3.googleusercontent.com/Djc9i7Ss46pBQLUBNbGtv0TO2h53K_-MbHWYwv_-uuOlG3J3axg-KdoBdNRcd8jkA11eEkWcUGAWDmYNe62K7A0RAVMPCP7TSjNo=w275",
  "https://lh3.googleusercontent.com/CZOgXeoLRF3LlbXYR-9FnYDC1ywZ94evkLEFuhEs_SbWBPAUpsnjXpwQw46rY0qVbHTQj1G_wrPhbhtiKUiQaLDNzpcrWDNYHaPPPQ=w275",
  "https://lh3.googleusercontent.com/sd9yzsNQjMpAV4OjIXqh9o7NIvU8EzvmWd-HOqb-H7m0lUOYrIYODSE4rDNI3PfxoYUqWqdPwfyhmJfeOEGJoy0fNkWbSNKo2C7n3A=w275",
  "https://lh3.googleusercontent.com/aplpABUwumDKJH8j6JE_0Bx7sy6Qib4s718OcAZdIMeW2-gaIj25AYdU8JOx2Aykvlw39b8uBBZoyAowvJem4faagSXlIyVhZ7bsIQ=w275",
  "https://lh3.googleusercontent.com/S7R8v8pcXHUmEVbEs5zQM3x4Bvcge4-o5pxCCnZXa4IEuQ3LRkKtr8LN3pn_bLYCKPVHRUkb24c14ZJY2wvFoEvm2KRfo2EjVN8LIr8=w275",
  "https://lh3.googleusercontent.com/WNom74hWXVMV3x4_r4C7g8eWwKI7oTiZ_C3VQF1tKBvWXGmmTVSX3fonOYIyM-jO0u44bCy3WhwC2PddSJj1mvZ3YBZgXgaAuKcUPA=w275",
  "https://lh3.googleusercontent.com/euXYLGZDsFqu0VrL-gxKB717UrkpLlTMlfcLqFz7OT_YiI3QJHqmYkXKMAJxxF9jJ3DSrxL0LthL_oeSc8bhesOMIv9AoJmrCMSUm7Y=w275",
  "https://lh3.googleusercontent.com/dPGlTKHMPOD_X01t2ySHYjkZ35H_smngji_jtlRlKCoGhXbCnrYFpv8dxpGWEcCqCjpDsKDiwULGzNFWlPdPAwwYiLAJBl9qEyPbyw=w275",
  "https://lh3.googleusercontent.com/lHDZjxaHS1Jjf3JaPBcsfGihi4x2SKNCK9RstK_vQAJgCK-deD4jX2Wt12hOhQV2TiYz2ADddZrJrnQBn9DvDhxSBBD2rQgut9AKLK4=w275",
  "https://lh3.googleusercontent.com/G9TVMR_5t68eLIAWyuN5-Ev0TOf0SqC1roE9K2aAvElWX9db3E940GlodJNRTGKKI3bJfR9FbBcLK6jnIjcwO3zE_C60CwfYvfUS5w=w275",
  "https://lh3.googleusercontent.com/S0JQi3DB93wxQrYV9wj86ie9wTVSm3UcyKspOPHvIkcBg_CtIDjsKA2DB3Poq94qDwdp0VTGRqmM_xaVpRD71beivcJ6rvLBMHu2=w275",
  "https://lh3.googleusercontent.com/LVAMTQj2eWPjmmCRKBEXnAvljD_ymRBjfS11BeQkYs-g7b1-mAQnPCum72arMfpsOiaY36M3llMg_erGwqrOtFqw1fE4eDFVfQZx-nY=w275",
  "https://lh3.googleusercontent.com/3ANZuDEVjD0tXbv5hLsh0OoiQz-QOL5VquCpDaJq0Gz3y-hP8Gdyg0KyHAmHdIiXFk-mYxEnbRPAXU6UxywsiX388Q6Pih2ykxcy4Q=w275",
  "https://lh3.googleusercontent.com/dQXEk3LfQC74tieXCOTHGtBKeAu1yOsH8WRv57hrjpic_4ixXg8YAjifuGW8rma4MT7-JSUlViLTv68ZYW3rZoafSw1pQ5auI-M7=w275",
  "https://lh3.googleusercontent.com/Wwh924QWYRcQ0tPA-MoKBFLfW9FWYvBeu-cMqd7g8ubc7l-D8U_gi0fzaVrn5SBNGD2g5A7fbGfsNLHKlAC8vSdTEjMgw3JpjQneWQ=w275",
  "https://lh3.googleusercontent.com/yQ-E3XgtlpTON7dWwGb0LVkkVhmzi9Ti1QpgV7vm6TkT3WP80IaT7d7Y6yKqzdzf2UbjyzoPUiKQC6Vl98knHr53kVxvp7OHswjQBg=w275",
  "https://lh3.googleusercontent.com/960Ufy-Z60OZ7W59_Wp4huffpfRlkHRwbnYIjvQXtSIMkKA2ag9lWmDSvkPNHYjFlduMc-fJBPz31UWzRYK0Bd6SA0yEIewcqbx8mBU=w275",
  "https://lh3.googleusercontent.com/vNAqTs5ZELt9VfXw8LT6FQUXsNgWIfTubnJ-qitGY6uRoQ6Od2_8W8AelOzYvA_IKb1iuqcgO2b9k_-DYjNdSEM6GPzVflcYiVUJ7A=w275",
  "https://lh3.googleusercontent.com/VVrwlGEZB6ZK6BnMKYf6OF_-pX92tJvI3ZWqJdtxHh7rTenyyKE6rp8cRknIJIBgWcLM1RlQtVOaSP5CtpQ4gO9HRWwHj3QZQTo1=w275",
  "https://lh3.googleusercontent.com/EilOBXlfLQwAAe5iTDMhKvGVmUXAc5JEEZmo5zchkR4WlW0-OphCNnSh6VQ4EIxBm2cwnYzoCLgcO2ic-PFpDsssbUq3rSQDZ7hH=w275",
  "https://lh3.googleusercontent.com/QAwZzX0NCgLhHhRIW7fY8KzkXgBwRsaKDmR4zbU1c6HaAPFrdU0usLsb5zYsP-K_GDa2C0-vUT5d8Xw3j8mVjmR_lZNnz7YShkxYig=w275",
  "https://lh3.googleusercontent.com/RuL84lVKaYdm9-SbWloAcNQ5Ba4n4CSKUJCLH2ZrQdVwMHgcpmsRKmqw8qyDnFqq0xHewHoX9mQxyzOV2ganAUd9GZs-khLixkerZw=w275",
  "https://lh3.googleusercontent.com/iYSu7HSBNtPCnob0fUr_N7AQjti9eaYBrthikOWA60XNBeTPSOGP6VnMeVwpfFjk3PjuoyvKGXxA3HylItaQvfIPChN790ym9Pjyvg=w275",
  "https://lh3.googleusercontent.com/DmN1caMXGXJh7jzaS9nL12BunjWWxnBfikeLmyqRnesF9tAIF7cTvvTyvzKgFVWDOpVIrEKX782wqDt9hAARiutmwHZFqAHFJPHP=w275",
  "https://lh3.googleusercontent.com/2fwwR_Q5BQZbmSTdgcB1WqPzhvSgnmZTYIe7yi0PIUrA4Re9Z42Mu64RlijNrdTQ0YgXQfLGq_ZFJovhljogIA6C_eVxFUegA_8ISg=w275",
  "https://lh3.googleusercontent.com/uDxEZgTealccsUamWR15-hUrF19989pXu_calT_tsGkKs3WVE0_cgxIRab3TTvybfqsu6D0-xi2OFZRY7VJGaIhXV3_7pp4taZ9e=w275",
  "https://lh3.googleusercontent.com/-QxRzhbZRfSLyAhHJ65fL3gpicKNuBaf8EPPLYJ2UE50iw8wApTDKk0SDKO70FSPUlpejl2vHxce6XHoTnyFZJNlwCYEJHNe1F6k5A=w275",
  "https://lh3.googleusercontent.com/vcWz0YjDAl4LIHqflMpWONCQZXowiujYpxUwaPx1nY0bV3uvZOGvsV84rhpVAv8KnnEu4fDqEO3bAFGIvgkjg5217mWMDmADJEcNouA=w275",
  "https://lh3.googleusercontent.com/rQqhN0G0x3i9hEFcUuTR2UzFUu-7BGruyEyAV_fYCYckBkmiTEbDyRuFO_afjIr7Xy1Uk_JY5xWOrrs-_gnEZVAZvbW0DdYJ_tlJ5Q=w275",
  "https://lh3.googleusercontent.com/AYC-6voHzwi92udd3ef1Oyw-YYcvOssgT72F8y1s3THSYf9afb68SnruMmlzcPbnVCew8Fjk6eoqz3KvfBSwGV9oRJyDMh_LUe5pqw=w275",
  "https://lh3.googleusercontent.com/zz_Q-ySj7YPBJ-VzF-YoHG_tPKrmscr4NQ3z0KkPdcssQ7pQvmxflkfkkrTBsD0Clya5xLUVNddn-RKeqaHO4EqktpkFVNUvuRzAi2Q=w275"
]

const Holders = () => {
  let router = useRouter()

  useEffect(() => {
    if (router.route && !router.route.includes('holders')) {
      router.push('/holders')
    }
  }, [router.route])

  let nft = {
    icon: 'https://etherscan.io/token/images/lobsterdao_32.png',
    name: 'lobsterdao',
  }

  const [holders, setHolders] = useState<any[]>([])
  const [error, setError] = useState<string>()
  const [isLoading, setLoading] = useState(false)

  const address = '0x026224a2940bfe258d0dbe947919b62fe321f042'

  const fetchAllData = async (nftCollection) => {
    setHolders(null)
    setLoading(true)

    await Promise.all([
      fetch(`${BASE_URL}/nft/holders?token=${nftCollection}`).then(res => res.json()),
      fetch(`https://randomuser.me/api/?results=30&seed=${nftCollection}&noinfo&inc=picture,username,login`).then(res => res.json()),
    ])
      .then(([holders, { results: users }]) => {
        let list = [
          { domain: 'samx.eth', twitter: 'samx', discord: 'sx#2401', isFav: true },
          { domain: 'xamgore.eth', twitter: 'xamgore', discord: 'xamgore#2401', isFav: true },
          { domain: null, discord: null, twitter: null, isFav: false },
          { domain: null, discord: 'sx#2401', twitter: null, isFav: false },
          { domain: null, discord: null, twitter: 'samx', isFav: false },
          { domain: null, twitter: null, isFav: false },
          { domain: null, twitter: null, isFav: false },
          { domain: null, twitter: null, isFav: false },
          { domain: null, twitter: null, isFav: false },
          { domain: null, twitter: null, isFav: false },
          { domain: null, twitter: null, isFav: false },
          { domain: null, twitter: null, isFav: false },
          { domain: null, twitter: null, isFav: false },
          { domain: null, twitter: null, isFav: false },
          { domain: null, twitter: null, isFav: false },
          { domain: null, twitter: null, isFav: false },
          { domain: null, twitter: null, isFav: false },
        ]

        setHolders(holders.slice(0, 12).map((h, idx) => ({
          ...h, ...{
            icon: users?.[idx]?.picture?.thumbnail,
            discord: users?.[idx]?.login?.username?.replace(/(\d+)/, '#$1'),
            firstBought: Date.now() - (Math.random() * 1000 * 3600 * 24 * 7 | 0),
            tokens: [lobsters[idx * 3], lobsters[idx * 3 + 1], lobsters[idx * 3 + 2]],
          }, ...list[idx]
        })))
      })
      .catch(err => setError(err?.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { address && fetchAllData(address) }, [address])

  const holdersColumns = useMemo(
    (): Column<any>[] => [
      {
        Header: <span style={{paddingLeft: '80px'}}>Address</span>,
        id: 'address',
        accessor: (row) => row, // accessor is the "key" in the data,
        Cell: ({ value: { icon, domain = null, address, isFav } }) => (
          <div className={css.holdingsTokenCell}>
            <div className={css.starIcon} style={{ [isFav && 'backgroundImage']: `url('/star-active.svg')` }}/>
            <div className={css.holdingsIcon} style={{ backgroundImage: `url(${icon})` }}/>
            <a href={`https://etherscan.io/address/${address}`} className={css.inTableLink}>{domain || address}</a>
          </div>
        )
      },
      {
        Header: 'Twitter',
        accessor: (row) => row.twitter,
        Cell: ({ value }) => value ? (
          <a href={`https://twitter.com/${value}`}>@{value}</a>
        ) : null,
      },
      {
        Header: 'Discord',
        accessor: (row) => row.discord,
      },
      {
        Header: 'Tokens',
        id: 'amount',
        accessor: row => row,
        Cell: ({ value: { amount, tokens } }) => (
          <div className={css.tokens}>
            <div className={css.tokens_counter}>{amount}</div>
            <div className={css.token} style={{backgroundImage: `url(${tokens[0]})`}}/>
            <div className={css.token} style={{backgroundImage: `url(${tokens[1]})`}}/>
            <div className={css.token} style={{backgroundImage: `url(${tokens[2]})`}}/>
          </div>
        )
      },
      {
        Header: 'Net worth',
        accessor: (row) => prettyNetWorth(row.total_balance_usd) || '—'
      },
      {
        Header: 'First bought',
        accessor: row => formatRelative(row.firstBought),
      },
      {
        Header: 'Links',
        accessor: row => row.address,
        Cell: ({ value }) => (
          <a href={`https://opensea.io/${value}`}><img src="https://opensea.io/static/images/logos/opensea.svg" width={19} height={19}/></a>
        )
      }],
    []
  )

  return (
    <div className={`${shared.column} ${indexStyles.main}`}>
      <header className={shared.content_header}>
        <h1 className={shared.content_header__title}>Holders</h1>
        <div className={shared.content_header__chain}>
          <span className={shared.content_header__chain_icon} style={{ backgroundImage: `url(${nft.icon})` }}/>
          {nft.name}
        </div>
      </header>

      <main className={css.content}>
        <div className={css.search_bar}>
          <img src={'/search.svg'} width={32} height={32} className={css.search_icon} alt=""/>
          <input type="text" placeholder="Search by address or ENS" className={css.search_input}/>
        </div>

        <div className={css.actions_panel}>
          <div>1684 holders</div>
          <div className={css.actions_panel__action}>
            <img src={'/inbox-mail.svg'} width={20} height={20} alt=""/>
            Export
          </div>
        </div>

        <UsersTable {...{ error, isLoading, data: holders as TableData, columns: holdersColumns as Column<TableData[0]>[] }} />
      </main>
    </div>
  )
}

export default Holders

function prettyNetWorth(amountInUsd: number): string {
  let digits = Math.log10(amountInUsd)

  let f = ([num, suffix]: [number, string]) => `$${Math.trunc(num).toLocaleString()}${suffix}`

  if (digits <= 7) return f([amountInUsd, '']) // 2'159'000 -> $2'159'000
  if (digits <= 9) return f([amountInUsd / 1_000_000, 'b'])
  if (digits <= 12) return f([amountInUsd / 1_000_000_000, 'tn'])
  return `$${formatBigNum(amountInUsd)}`
}

function formatBigNum(amountInUsd: number): string {
  console.log(amountInUsd)
  let subs = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }
  let uppers = `${Math.log10(amountInUsd) | 0}`.split('').map(ch => subs[ch] ?? ch).join('')
  return `10${uppers}`
}

function formatRelative(date: number): string {
  let diff = Math.abs(Date.now() - date) / 1000 / 3600 | 0
  if (diff < 1) return 'recently'
  if (diff === 1) return `1 hour ago`
  if (diff < 24) return `${diff} hours ago`
  diff = diff / 24 | 0
  if (diff == 1) return `1 day ago`
  if (diff < 30) return `${diff} days ago`
  return `meh`
}
