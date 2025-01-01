<?php

namespace App\Http\Controllers\API\News;

use App\Http\Controllers\Controller;
use App\Models\news\NewsContent;
use App\Models\news\NewsContentLanguage;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class NewsContentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request): Response
    {
        //
        // if(Auth::guard('api')->check()){
            $page = $request->input('page', 1);
            $size = $request->input('size', 15);

            $response = NewsContent::with('NewsContentLanguage')->paginate($size, ['*'], 'page', $page);

            // $response = NewsContent::with('NewsContentLanguage')->get();
            return Response(['data'=> $response, 'status'=> 200], 200);
        // }
        // return Response(['data' => 'Unauthorized!', 'status'=>401], 401);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    // public function store(Request $request): Response
    // {
    //     //
    //     if(Auth::guard('api')->check()){        
    //         $validatedData = $request->validate([
    //             'email' => 'required',
    //         ]);
    //         if($User = User::create($request->all())){
    //             return Response(['data' => $User, 'message' => 'User created Successfully !.'], 201);
    //         }else{
    //             return Response(['data' => $User, 'message' => 'Missing Field !.'], 400);
    //         }
    //     }
    //     return Response(['data' => 'Unauthorized!'], 401);
    // }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show($identifier): Response
    {
        //check auth 
        // if(!Auth::guard('api')->check()){
        //     return Response(['data' => 'Unauthorized!'], 401);
        // }

        $response = NewsCategory::with('NewsCategorylanguage')->where('id', $identifier)->first();
        return Response(['data'=> $response, 'status'=> 200], 200);        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    // public function update(Request $request, $user): Response
    // {
    //     //
    //     if(Auth::guard('api')->check()){        
    //         $validatedData = $request->validate([
    //             'email' => 'required',
    //         ]);
    //         $User = User::find($user);
    //         if(!$User){
    //             return Response(['data' => $User, 'message' => 'User not found !.'], 404);
    //         }else{
    //             $User = $User->update($request->all());       
    //             return Response(['data' => $User, 'message' => 'updated successfully!.'], 204);
    //         }
    //     }
    //     return Response(['data' => 'Unauthorized!'], 401);
    // }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    // public function destroy(Request $request, $user): Response
    // {
    //     //
    //     if(Auth::guard('api')->check()){
    //         $response = User::find($user);
    //         dd($response);
    //         if (! $response) {
    //             return Response(['data' => 'User not found !.'], 404);
    //         }
    //         $response->delete();
    //         return Response(['data' => 'User Deleted Successfully !.'], 202);
    //     }
    //     return Response(['data' => 'Unauthorized!'], 401);
    // }
}
