from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt

import braintree

# Create your views here.


gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        braintree.Environment.Sandbox,
        merchant_id="k7vt7292dg7srwnw",
        public_key="d7xf7cbc63wgd92c",
        private_key="b5815d2c0ecbec1847e0e5b79efa6721"
    )
)


def validate_user_session(id, token):
    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False


@csrf_exempt
def generate_token(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({'error': 'Invalid session, Please login again!'})
    res = gateway.client_token.generate(params={'merchant_account_id': "k7vt7292dg7srwnw"})
    return JsonResponse({'clientToken': res, 'success': True})


@csrf_exempt
def process_payment(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({'error': 'Invalid session, Please login again!'})

    nonce_from_the_client = request.POST["paymentMethodNonce"]
    amount_from_the_client = request.POST["amount"]
    print(request.POST)
    print(f"nonce_from_the_client----> {nonce_from_the_client}")
    print(f"amount_from_the_client----> {amount_from_the_client}")
    result = gateway.transaction.sale({
        "amount": amount_from_the_client,
        "payment_method_nonce": nonce_from_the_client,
        "options": {
            "submit_for_settlement": True
        }
    })
    print(f"result->> {result}")
    if result.is_success:
        return JsonResponse({
            "success": result.is_success, 'transaction': {'id': result.transaction.id, 'amount': result.transaction.amount}})
    else:
        return JsonResponse({'error': True, 'sucess': False})

