from starlette.responses import JSONResponse
import notifier.client


async def send_by_email_after_registration(request):
    a = notifier.client.NotificationClient(port=9900, host='localhost')
    try:
        await a.send_by_email_after_registration("artm-porjad@mail.ru")
    except Exception:
        return JSONResponse('Сервер не отвечает')
    return JSONResponse('Спасибо за регистрацию')


async def homepage(request):
    return JSONResponse({'hello': 'world'})


