<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Code; 
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserauthController extends Controller
{

    public function userRegister(Request $request): Response
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users|max:255',
            'password' => 'required|string|min:6|confirmed',
            'password_confirmation' => 'required|string|min:6',
        ]);

        // If validation fails, return a response with the error messages
        if ($validator->fails()) {
            return Response(['status' => 400, 'errors' => $validator->errors()], 400);
        }

        // Create a new user with the validated data
        $user = User::create([
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'firstname' => $request->input('firstname'),
            'lastname' => $request->input('lastname'),
            'type' => $request->input('type'),
            'phone' => $request->input('phone'),
            'profile_img' => $request->input('profile_img'),
            'national_id_no'=> $request->input('national_id_no'),
            'address' => $request->input('address'),
            'facebook_id' => $request->input('facebook_id'),
            'google_id' => $request->input('google_id')
        ]);

        // Attempt to log in the newly registered user
        Auth::login($user);

        // Generate and return an access token for the logged-in user
        $token = $user->createToken('example')->accessToken;
        return Response(['status' => 201, 'token' => $token], 201);
    }


    /**
     * userLogin function.
     *
     * @return \Illuminate\Http\Response
     */
    public function userLogin(Request $request): Response
    {
        $input = $request->all();
        if (Auth::attempt($input)) {
            $user = Auth::user();
            $token = $user->createToken('example')->accessToken;
            return response(['status' => 200, 'token' => $token], 200);
        } else {
            return response(['status' => 401, 'message' => 'Invalid credentials.'], 401);
        }
    }

    /**
     * getUserDetails function.
     *
     * @return \Illuminate\Http\Response
     */
    public function getUserDetails(): Response
    {
        if (Auth::guard('api')->check()) {
            // $user = Auth::guard('api')->user()->load('store');
            // $user = Auth::guard('api')->user()->load(['store' => function ($query) {
            //     $query->where('is_default', 1);
            // }]);
            $user = Auth::guard('api')->user();
            return response(['data' => $user], 200);
        }

        return response(['data' => 'Unauthorized!'], 401);
    }

    /**
     * userLogout function.
     *
     * @return \Illuminate\Http\Response
     */
    public function userLogout(): Response
    {
        //
        if(Auth::guard('api')->check()){
            $accessToken = Auth::guard('api')->user()->token();
                \DB::table('oauth_refresh_tokens')
                    ->where('access_token_id', $accessToken->id)
                    ->update(['revoked' => true]);
            $accessToken->revoke();
            return Response(['data' => 'Unauthorized!', 'message' => 'User logout successfully !.'], 200);
        }
        return Response(['data' => 'Unauthorized!'], 401);
    }

    //send varification code for password change
    public function sendVarificationCode(Request $request): Response
    {
        // Receive request data
        $input = $request->all();
        
        // Check if email exists in the request
        if (isset($input['email'])) {
            // Find user by email in the 'users' table
            $user = User::where('email', $input['email'])->first();
            // var_dump($user); 
            if ($user) {
                //save to codes 
                $verificationCode = mt_rand(100000, 999999); // Generating a 6-digit code
                $expire_at = Carbon::now()->addSeconds(300);
            
                // Save the password verification code to the 'codes' table using the Code model
                $code = Code::create([
                    'email' => $user->email,
                    'request_url' => $input['request_url'],
                    'code' => $verificationCode,
                    'expire_at' => $expire_at,
                ]);

                // send this code to email 
                // $message = 'Your Password recovery code is: '.$verificationCode;
                // $headers = 'From: info@phicsart.com';
                // $mailSent = mail($user->email, 'Verification Code - PhicsPos', $message, $headers);

                // Return a response
                return Response(['data' => $code, 'message' => 'Code sent successfully !'], 200);
            } else {
                return Response(['status' => 404, 'message' => 'Email Not Found !'], 404);
            }
        } else {
            return Response(['status' => 400, 'message' => 'Email Not provided !'], 404);
        }
    }

    public function verifyCode(Request $request): Response
    {
        // Receive request data
        $input = $request->all();
        if (isset($input['email']) && isset($input['verification_code'])) {
            $user = User::where('email', $input['email'])->first();
            
            if ($user) {
                $codeExists = Code::where('email', $user->email)
                                ->where('code', $input['verification_code'])
                                // ->where('expire_at', '>', now()) // Check if the code is not expired
                                ->exists();
                                
                if ($codeExists) {                    
                    return Response(['status' => 200, 'message' => 'Verification code is valid !'], 200);
                } else {
                    return Response(['status' => 400, 'message' => 'Invalid or expired verification code !'], 400);
                }
            } else {
                return Response(['status' => 404, 'message' => 'User not found !'], 404);
            }
        } else {
            return Response(['status' => 400, 'message' => 'Email or verification code not provided !'], 400);
        }
    }

    public function changePassword(Request $request): Response
    {
        // Receive request data
        $input = $request->all();
        
        // Check if email and new password exist in the request
        if (isset($input['email']) && isset($input['new_password'])) {
            $user = User::where('email', $input['email'])->first();
            
            if ($user) {
                $user->password = bcrypt($input['new_password']);
                $user->save();

                return Response(['status' => 200, 'message' => 'Password changed successfully !'], 200);
            } else {
                return Response(['status' => 404, 'message' => 'User not found !'], 404);
            }
        } else {
            return Response(['status' => 400, 'message' => 'Email or password not provided !'], 400);
        }
    }

}
