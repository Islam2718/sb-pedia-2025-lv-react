<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    // /**
    //  *fields 
    //     id
    //     academia_content_id 
    //     academia_category_id 
    //  */
    public function up()
    {
        Schema::create('academia_categories_contents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('academia_content_id');
            $table->unsignedBigInteger('academia_category_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('academia_categories_contents');
    }
};
