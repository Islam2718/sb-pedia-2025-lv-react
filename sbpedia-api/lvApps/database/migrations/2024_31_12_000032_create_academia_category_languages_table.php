<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    // /**
    //  * fields: 
    //  *
    //  academia_category_id
    //     setting_language_id
    //     name
    //     description
    //     is_default
    //     created_by
    //     updated_by
    //     created
    //     updated*  
    //  */
    public function up()
    {
        Schema::create('academia_category_languages', function (Blueprint $table) {
            $table->id();
            $table->integer('academia_category_id');
            $table->integer('setting_language_id');
            $table->string('name');
            $table->string('description');
            $table->boolean('is_default');
            $table->integer('created_by');
            $table->integer('updated_by');
            $table->dateTime('created');
            $table->dateTime('updated');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('academia_category_languages');
    }
};
