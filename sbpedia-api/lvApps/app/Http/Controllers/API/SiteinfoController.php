<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Siteinfo;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Auth;

class SiteinfoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $response = Siteinfo::find(1);
        if(!$response){
            return Response(['message' => 'User not found !.', 'status'=>404], 404);
        }else{      
            return Response(['data' => $response, 'status' => 200], 200);
        }

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function create()
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    // public function store(Request $request)
    // {
    //     //
    // }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Siteinfo  $siteinfo
     * @return \Illuminate\Http\Response
     */
    // public function show($id): Response
    // {
    //     //
    //     // if(Auth::guard('api')->check()){        
    //         $response = Siteinfo::find($id);
    //         if(!$response){
    //             return Response(['message' => 'User not found !.', 'status'=>404], 404);
    //         }else{      
    //             return Response(['data' => $response, 'status' => 200], 200);
    //         }
    //     // }
    // }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Siteinfo  $siteinfo
     * @return \Illuminate\Http\Response
     */
    // public function edit(Siteinfo $siteinfo)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Siteinfo  $siteinfo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id): Response
    {
        //
        // if(Auth::guard('api')->check()){ 
            $validatedData = $request->validate([
                'title' => 'required',
            ]);
            $response = Siteinfo::find($id);
            if (!$response) {
                return Response(['message' => 'Not found !.', 'status'=>404], 404);
            }
            $response->update($request->all());
            return Response(['data' => $response, 'message' => 'Updated successfully!.'], 200);
        // }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Siteinfo  $siteinfo
     * @return \Illuminate\Http\Response
     */
    // public function destroy(Siteinfo $siteinfo)
    // {
    //     //
    // }
}
